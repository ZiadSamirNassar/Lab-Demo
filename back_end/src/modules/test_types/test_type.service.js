import {testTypeSchema, testTypeUpdateSchema, testTypesDB} from "../../DB/index.js";
const data = new Date();


function mergeFieldsWithUpdate(fields, newFields) {
    // إنشاء خريطة للعناصر الموجودة
    const fieldsMap = new Map(fields.map(field => [field.label, field]));
    
    // معالجة العناصر الجديدة
    newFields.forEach(newField => {
        if (fieldsMap.has(newField.label)) {
            // تحديث العنصر الموجود
            let field = fieldsMap.get(newField.label);
            field.unit = newField.unit ?? field.unit;
            field.normal = newField.normal ?? field.normal;
            field.type = newField.type ?? field.type;

            // Object.assign(fieldsMap.get(newField.label), field);
        } else {
            // إضافة عنصر جديد
            fieldsMap.set(newField.label, newField);
        }
    });
    
    return Array.from(fieldsMap.values());
}

async function searchTestTypesByPrefix(db, prefix) {
        const start = prefix.toLowerCase();
        const end = start + '\ufff0';

        const result = await db.allDocs({
            include_docs: true,
            startkey: start,
            endkey: end
        });

        return result.rows.map(row => row.doc);
}

function getAllTestsFormate(tests) {

    tests = tests.rows

    tests.forEach(test => {
        let { doc } = test
        let { name, fields, category, createdAt } = doc

        test.key = undefined;
        test.value = undefined;
        test.doc = undefined;

        test.name = name;
        test.category =category;
        test.fields =fields;
        if(createdAt){
            test.createdAt = createdAt.split("T")[0];
        }
        
    });

    return tests;
}

function searchTestsFormate (test) {
    let { _id, name, fields, category, createdAt } = test

    test.key = undefined;
    test.value = undefined;
    test.doc = undefined;
    test._rev = undefined;

    test.id = _id
    test._id = undefined

    test.name = name;
    test.fields =fields;
    test.category =category;
    if(createdAt){
        test.createdAt = createdAt.split("T")[0];
    }
}
//=============================================================
export const getAllTestTypes = async (req, res) => {
  try {
    let testTypes = await testTypesDB.allDocs({ include_docs: true });

    if (testTypes.total_rows <= 0) {
      return res.status(404).json({
        message: "لا يوجد تحاليل علي السيستيم",
        sucsses: false,
      });
    }

    testTypes = getAllTestsFormate(testTypes);

    res.json({ message: "done", data: testTypes, sucsses: true });

  } catch (error) {
    const { reason, status, message, docId } = error;

    console.error("end-point Error Document not found :", {
    reason,
    message,
    docId,
    });

    return res
    .status(status || 500)
    .json({ message, sucsses: false });

  }
}


export const searchTestTypesByPartialId = async (req, res) => {
  try {
    const { id } = req.params;

    let docs = await searchTestTypesByPrefix(testTypesDB, id);

    docs.forEach(test => {
        searchTestsFormate(test);
    });

    if( docs.length <=0 ){
        return res
        .status(404)
        .json({
            message: "لا يوجد تحليل بهاذا الاسم",
            sucsses: false
        })
    }

    res.json({ message: "done", data: docs, sucsses: true });
  } catch (error) {
    const { reason, status, message, docId } = error;

    console.error("end-point Error Document not found :", {
    reason,
    message,
    docId,
    });

    return res
    .status(status || 500)
    .json({ message, sucsses: false });

  }
}


export const createTestType = async(req, res) => {
  try {
    //{_id, name, fields} : requiered fields
    const validatedData = testTypeSchema.parse(req.body);

    const test = await testTypesDB.put(validatedData);

    if(!test){
        return res
        .status(500)
        .json({
            message:"فشل انشاء تحليل جديد",
            sucsses: false
        });
    }

    return res
    .json({
        message:"تم اضافه التحليل بنجاح",
        data: validatedData,
        sucsses: true
    });

  } catch (error) {
    // 🛑 If validation failed
    if (error.name === "ZodError") {
        const firstError = error.errors?.[0];
        if (firstError) {
            let message = `${firstError.code}, ${firstError.path[0]} is ${firstError.message} expected ${firstError.expected}`;
            console.error(message)
            return res.status(400).json({
                message,
                details: error.errors,
                sucsses: false,
            });
        }

    }

    const { reason, status, message, docId } = error;

    console.error("end-point Error Document not found :", {
    reason,
    message,
    docId,
    });

    return res
    .status(status || 500)
    .json({ message, sucsses: false });

  }
}


export const updateTestTypeAndFieldsContent = async(req, res) => {
    try{
        const {id} = req.params;
        let validationResult = testTypeUpdateSchema.parse(req.body);

        if(!validationResult.success){
            return res.status(400).json({
                message: "بيانات غير صحيحة",
                errors: validationResult.error.errors,
                success: false
            });
        }

        let {name, category, fields} = validationResult.data;

        let test = await testTypesDB.get(id);

        test.name = name ?? test.name
        test.category = category ?? test.category

        if(fields.length > 0){
            let newFields = mergeFieldsWithUpdate(test.fields, fields);
            test.fields = newFields;
        }

        test.updatedAt = data.toISOString().split("T")[0];
        
        const updatedTest = await testTypesDB.put(test);

        if(!updatedTest){
            throw new Error({message: "فشل تعديل التحليل"});
        }

        test._rev = undefined;

        test.id = test._id;
        test._id = undefined;

        return res.json({message: "تم تعديل بيانات التحليل بنجاح", data: test, sucsses: true})

    } catch (error) {
    // 🛑 If validation failed
    if (error.name === "ZodError") {
        const firstError = error.errors?.[0];
        if (firstError) {
            let message = `${firstError.code}, ${firstError.path[0]} is ${firstError.message} expected ${firstError.expected}`;
            console.error(message)
            return res.status(400).json({
                message,
                details: error.errors,
                sucsses: false,
            });
        }

    }

    const { reason, status, message, docId } = error;

    console.error("end-point Error Document not found :", {
    reason,
    message,
    docId,
    });

    return res
    .status(status || 500)
    .json({ message, sucsses: false });

  }
}
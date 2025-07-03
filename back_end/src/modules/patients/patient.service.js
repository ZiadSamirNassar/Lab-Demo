const { sqldb, findPatients, findPatientByid, insertPatient, updatePatient } = require('../../DB')

const getAllPatients = async(req, res) => {

    try{
        
        const patients = await findPatients();

        if(!patients || patients.length <= 0){
            return res
            .status(404)
            .json({
                message: "There Is NO Patients",
                 sucsses: false
            })
        }

        return res.json({massage: "done", data: patients, sucsses: true })

    }catch (error) {
        console.error("end-point Error : ",error.message)
        return res.status(500).json({message: "Internal Server Error", sucsses: false})
    }


}


const getPatientByid = async(req, res) => {

    const {id} = req.params

    try{

        const patient = await findPatientByid(id);

        if(!patient){
            return res.status(404).json({message: "Patient Not Exist", sucsses: false})
        }

        return res.json({massage: "done", data: patient, sucsses: true })

    }catch (error) {
        console.error("end-point Error : ",error.message)
        return res.status(500).json({message: "Internal Server Error", sucsses: false})
    }



}


const createPatient = async(req, res) => {

    let {name, age, phone, gender} = req.body;

    if(!name){
        return res.status(400).json({message: "name Is Required", sucsses: false})
    }if(!age){
        return res.status(400).json({message: "age Is Required", sucsses: false})
    }if(!phone){
        phone = '0000'
    }if(!gender){
        gender = "male"
    }

    try{
        const insertedPatient = await insertPatient(name, age, gender, phone);

        if(!insertedPatient || insertedPatient.changes == 0){
            return res
            .status(401)
            .json({
                message: "Patient Not Created!",
                sucsses: false
            })
        }

        return res.json({massage: "Patient Created Sucssesfully", patientId: insertedPatient.lastInsertRowid, sucsses: true })
    }catch (error) {
        console.error("end-point Error : ",error.message)
        return res.status(500).json({message: "Internal Server Error", sucsses: false})
    }

}


const updatedPatient = async(req, res) => {
    const {id} = req.params;
    let {name, age, gender, phone} = req.body;

    try{

        let patient = await findPatientByid(id);

        if(!patient){
            return res.status(404).json({message: "This Patient Not Exist", sucsses: false})
        }

        name = name || patient.name;
        age = age || patient.age;
        gender = gender || patient.gender;
        phone = phone || patient.phone;

        const updated = await updatePatient(name, age, gender, phone, id)

        if(!updated || updated.changes == 0){
            return res.status(401).json({
                message: "Can Not Update User Now",
                sucsses: false
            })
        }

        patient = await findPatientByid(id);

        return res.json({massage: "Patient Updated Sucssesfully", data: patient, sucsses: true })

    }catch (error) {
        console.error("end-point Error : ",error.message)
        return res.status(500).json({message: "Internal Server Error", sucsses: false})
    }

}

module.exports = {
    getAllPatients,
    getPatientByid,
    createPatient,
    updatedPatient,
}
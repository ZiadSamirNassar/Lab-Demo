import generatePDF from "../../utils/generate_pdf/index.js";
import { testResultsDB, updateTestResultFields, Patient, testTypesDB } from "../../DB/index.js";

export const getTestResultForPatient = async (req, res) => {
    try {
        const testResult = await testResultsDB.get(req.params.id);

        if (!testResult) {
            throw new Error({ message: 'test result not found', cause: 404 });
        }
        return res.json({ message: 'test result found', success: true, data: testResult });
    } catch (error) {
        console.error(error);
        return res.status(error.cause || 500).json({ message: error.message, success: false });
    }
}
    
export const updateTestResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { fields } = req.body;

        if (!fields) {
            throw new Error({ message: 'fields is required', cause: 400 });
        }

        const testResult = await testResultsDB.get(id);

        if (!testResult) {
            throw new Error({ message: 'test result not found', cause: 404 });
        }

        const updatedTestResult = await updateTestResultFields(testResult, fields);

        return res.json({ message: 'test result updated', success: true, data: updatedTestResult });
    } catch (error) {
        console.error(error);
        return res.status(error.cause || 500).json({ message: error.message, success: false });
    }
}

export const createPDFForTestResult = async (req, res) => {
    try {
        const { id } = req.params;
        let testResult = await testResultsDB.get(id);

        if (!testResult) {
            throw new Error({ message: 'test result not found', cause: 404 });
        }
        testResult.id = testResult._id;
        testResult._id = undefined;
        testResult._rev = undefined;



        const patient = await Patient.findByPk(testResult.patientId);

        if (!patient) {
            throw new Error({ message: 'patient not found', cause: 404 });
        }
        testResult.patientId = undefined;
        testResult.patient = { name: patient.name, age: patient.age, phone: patient.phone, gender: patient.gender };

        const testType = await testTypesDB.get(testResult.testTypeId);

        if (!testType) {
            throw new Error({ message: 'test type not found', cause: 404 });
        }
        testResult.testTypeId = undefined;
        testResult.testType = { name: testType.name, category: testType.category };

        const pdf = await generatePDF(testResult);

        return res.json({ message: 'pdf created successfully', success: true, data: testResult });
    } catch (error) {
        console.error(error);
        return res.status(error.cause || 500).json({ message: error.message, success: false });
    }
}

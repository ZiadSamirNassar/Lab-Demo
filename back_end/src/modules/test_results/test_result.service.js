import generatePDF from "../../utils/generate_pdf/index.js";
import { testResultsDB, updateTestResultFields, Patient, testTypesDB } from "../../DB/index.js";

export const getTestResultForPatient = async (req, res) => {
    
        const testResult = await testResultsDB.get(req.params.id);

        if (!testResult) {
            const error = new Error('test result not found');
            error.statusCode = 404;
            throw error
        }
        return res.json({ message: 'test result found', success: true, data: testResult });
}
    
export const updateTestResult = async (req, res) => {
    
        const { id } = req.params;
        const { fields } = req.body;

        const testResult = await testResultsDB.get(id);

        if (!testResult) {
            const error = new Error('test result not found');
            error.statusCode = 404;
            throw error
        }

        const updatedTestResult = await updateTestResultFields(testResult, fields);

        return res.json({ message: 'test result updated', success: true, data: updatedTestResult });
}

export const createPDFForTestResult = async (req, res) => {
    
        const { id } = req.params;
        let testResult = await testResultsDB.get(id);

        if (!testResult) {
            const error = new Error('test result not found');
            error.statusCode = 404;
            throw error
        }
        testResult.id = testResult._id;
        testResult._id = undefined;
        testResult._rev = undefined;



        const patient = await Patient.findByPk(testResult.patientId);

        if (!patient) {
            const error = new Error('patient not found');
            error.statusCode = 404;
            throw error
        }
        testResult.patientId = undefined;
        testResult.patient = { name: patient.name, age: patient.age, phone: patient.phone, gender: patient.gender };

        const testType = await testTypesDB.get(testResult.testTypeId);

        if (!testType) {
            const error = new Error('test type not found');
            error.statusCode = 404;
            throw error
        }
        testResult.testTypeId = undefined;
        testResult.testType = { name: testType.name, category: testType.category };

        const pdf = await generatePDF(testResult);

        return res.json({ message: 'pdf created successfully', success: true, data: testResult });
}

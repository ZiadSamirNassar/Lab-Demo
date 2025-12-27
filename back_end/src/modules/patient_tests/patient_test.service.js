import { Patient, testTypesDB, PatientTest, createTestResultForeTestType } from "../../DB/index.js";

export const createTestForPatientFromTestType = async (req, res) => {
    
        const { patientId, testTypeId } = req.params;

        const patient = await Patient.findByPk(patientId);
        if(!patient){
            const error = new Error('patient not found');
            error.statusCode = 404;
            throw error
        }

        const testType = await testTypesDB.get(testTypeId)
        if(!testType){
            const error = new Error('there is no test with this name');
            error.statusCode = 404;
            throw error
        }

        const testResult = await createTestResultForeTestType({testTypeId, fields: testType.fields, patientId})
        if(!testResult){
            const error = new Error('internal server error');
            error.statusCode = 500;
            throw error
        }

        const patientTest = await PatientTest.create({ patientId, testTypeId, resultId: testResult.id })
        if(!patientTest){
            const error = new Error('can\'t create test for patient');
            error.statusCode = 500;
            throw error
        }
        
        res.json({message: 'patient test created sucessfully', success: true})
    } 

export const allTestsForPatient = async (req, res) => {

        const {patientId} = req.params;

        const patient = await Patient.findByPk(patientId, {
            attributes: [ 'name', 'age', 'phone'],
            include: [
                {
                    model: PatientTest
                }
            ]});
        if(!patient){
            const error = new Error('patient not found');
            error.statusCode = 404;
            throw error
        }

        res.json({massage: 'patient tests found', success: true, data: patient});


}
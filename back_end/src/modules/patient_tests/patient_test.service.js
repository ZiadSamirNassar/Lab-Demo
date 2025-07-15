const { Patient, testTypesDB, PatientTest, createTestResultForeTestType } = require('../../DB');

const createTestForPatientFromTestType = async (req, res) => {
    try{
        const { patientId, testTypeId } = req.params;

        const patient = await Patient.findByPk(patientId);
        if(!patient){
            return res.status(404).json({message: 'patient not found', success: false})
        }

        const testType = await testTypesDB.get(testTypeId)
        if(!testType){
            return res.status(404).json({message: 'there is no test with this name', success: false})
        }

        const testResult = await createTestResultForeTestType({id: testType._id, fields: testType.fields})
        if(!testResult){
            return res.status(500).json({message: 'internal server error', success: false})
        }

        const patientTest = await PatientTest.create({ patientId, testTypeId, resultId: testResult.id })
        if(!patientTest){
            return res.status(500).json({message: 'can\'t create test for patient', success: false})
        }
        
        res.json({message: 'patient test created sucessfully', success: true})
    } catch (error) {
        const { reason, status, message, docId } = error;

        console.error("end-point Error Document not found :", {error});

        return res
        .status(status || 500)
        .json({ message, sucsses: false });

    }
}


const allTestsForPatient = async (req, res) => {
    try{
        const {patientId} = req.params;

        const patient = await Patient.findByPk(patientId, {
            attributes: [ 'name', 'age', 'phone'],
            include: [
                {
                    model: PatientTest,
                    attributes: {exclude: ['resultId']}
                }
            ]});
        if(!patient){
            return res.status(404).json({message: 'patient not found', success: false})
        }

        res.json(patient);

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


module.exports = {
    createTestForPatientFromTestType,
    allTestsForPatient
}
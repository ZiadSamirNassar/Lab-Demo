const {Router} = require('express');
const { createTestForPatientFromTestType, allTestsForPatient } = require('./patient_test.service');

const patientTestRouter = Router()

//====create test for patient from an test_type with no result======
patientTestRouter.post('/:patientId/:testTypeId', createTestForPatientFromTestType)

//====================view all tests for one patient===================
patientTestRouter.get('/hestory/:patientId', allTestsForPatient)


module.exports = patientTestRouter
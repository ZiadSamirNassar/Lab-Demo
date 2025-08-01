import { Router } from "express";
import { createTestForPatientFromTestType, allTestsForPatient } from "./patient_test.service.js";
import { asyncHandler } from "../../utils/index.js";

const patientTestRouter = Router()

//====create test for patient from an test_type with no result======
patientTestRouter.post('/:patientId/:testTypeId', asyncHandler(createTestForPatientFromTestType))

//====================view all tests for one patient===================
patientTestRouter.get('/hestory/:patientId', asyncHandler(allTestsForPatient))


export default patientTestRouter
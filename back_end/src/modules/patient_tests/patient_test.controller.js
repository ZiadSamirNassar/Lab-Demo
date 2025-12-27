import { Router } from "express";
import { createTestForPatientFromTestType, allTestsForPatient } from "./patient_test.service.js";
import { asyncHandler, isValid } from "../../utils/index.js";
import { createTestForPatientFromTestTypeSchema, allTestsForPatientSchema } from "./patient_test.validation.js";

const patientTestRouter = Router()

//====create test for patient from an test_type with no result======
patientTestRouter.post(
    '/:patientId/:testTypeId',
    asyncHandler(isValid(createTestForPatientFromTestTypeSchema)),
    asyncHandler(createTestForPatientFromTestType)
)

//====================view all tests for one patient===================
patientTestRouter.get(
    '/hestory/:patientId',
    asyncHandler(isValid(allTestsForPatientSchema)),
    asyncHandler(allTestsForPatient)
)


export default patientTestRouter
import { Router } from "express";

import { getTestResultForPatient, updateTestResult, createPDFForTestResult } from "./test_result.service.js";
import { asyncHandler, isValid } from "../../utils/index.js";
import { updateTestResultSchema } from "./test_result.validatin.js";


const testResultRouter = Router();
//====================get test result for patient ===========================
testResultRouter.get(
    '/:id',
    asyncHandler(getTestResultForPatient)
)

//====================update test result fields===========================
testResultRouter.put(
    '/fields/:id',
    asyncHandler(isValid(updateTestResultSchema)),
    asyncHandler(updateTestResult)
)


//====================create pdf from one test result===========================
testResultRouter.get(
    '/:id/pdf',
    asyncHandler(createPDFForTestResult)
)
export default testResultRouter;

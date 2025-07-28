import { Router } from "express";

import { getTestResultForPatient, updateTestResult, createPDFForTestResult } from "./test_result.service.js";

const testResultRouter = Router();
//====================get test result for patient ===========================
testResultRouter.get('/:id', getTestResultForPatient)

//====================update test result fields===========================
testResultRouter.put('/fields/:id', updateTestResult)


//====================create pdf from one test result===========================
testResultRouter.get('/:id/pdf', createPDFForTestResult)
export default testResultRouter;

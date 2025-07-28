const { Router } = require("express");
const testResultRouter = Router();
const { getTestResultForPatient, updateTestResultFields, createPDFForTestResult } = require("./test_result.service");
//====================get test result for patient ===========================
testResultRouter.get('/:id', getTestResultForPatient)

//====================update test result fields===========================
testResultRouter.put('/fields/:id', updateTestResultFields)


//====================create pdf from one test result===========================
testResultRouter.get('/:id/pdf', createPDFForTestResult)
module.exports = testResultRouter;

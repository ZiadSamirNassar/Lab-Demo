import { testTypesDB, testResultsDB } from "../index.js";
import { testTypeSchema } from "./nosql.schemas.js";

async function addTestType(input) {
  try {
    // ✅ Validate and apply defaults
    const validated = testTypeSchema.parse({
      ...input,
      createdAt: new Date().toISOString()
    });

    return await testTypesDB.put(validated);
  } catch (err) {
    console.error('❌ Validation Error:', err.errors);
    throw new Error('Invalid test type data');
  }
}

async function createTestResultForeTestType({testTypeId, fields, patientId}) {
  try {
    let result = {
      testTypeId,
      patientId,
      createdAt: new Date().toISOString()
    }
    await fields.forEach( field => {
      field.result = ""
    })

    result.fields = fields;
    
    result = await testResultsDB.post(result);

    return result;
  } catch (err) {
    console.error('❌ Error:', err.message);
    throw new Error('error createing test result');
  }
}

async function updateTestResultFields(testResult, fields) {
  try {

    testResult.fields.forEach((field, index) => {
      if(field.label === fields[index].label){
        field.result = fields[index].result
      }
    })

    await testResultsDB.put(testResult);

    return testResult;
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw new Error('error updating test result');
  }
}

export {
    addTestType,
    createTestResultForeTestType,
    updateTestResultFields
}
const { testTypesDB, testResultsDB } = require('./nosql.utils');
const { testTypeSchema } = require('./nosql.schemas');

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

async function createTestResultForeTestType(testType) {
  try {
    let result = {
      testTypeId: testType.id
    }
    await testType.fields.forEach( field => {
      field.result = ""
    })

    result.fields = testType.fields;
    
    result = await testResultsDB.post(result);

    return result;
  } catch (err) {
    console.error('❌ Error:', err.message);
    throw new Error('error createing test result');
  }
}

module.exports = {
    addTestType,
    createTestResultForeTestType,
}
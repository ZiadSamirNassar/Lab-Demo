const { testTypesDB } = require('./nosql.module');
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

module.exports = {
    addTestType,
}
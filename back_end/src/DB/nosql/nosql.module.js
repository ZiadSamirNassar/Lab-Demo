const { createBenchDB } = require('./nosql.utils');

const testResultsDB = createBenchDB('test_results');
const testTypesDB = createBenchDB('test_types');
const { testTypeSchema, testTypeUpdateSchema } = require('./nosql.schemas')

module.exports = {
  testResultsDB,
  testTypesDB,
  testTypeSchema,
  testTypeUpdateSchema
};
// Create/Update document
// await db.put({object with his _id})

// Get document by ID
// const doc = await db.get(obj _id);

// Create document with auto-generated ID
// const result = await db.post({obj});


// Update existing document
// const doc = await db.get(obj _id);
// doc.age = 31;
// await db.put(doc);


// Delete document
// await db.remove(doc);

// Bulk insert/update
// await db.bulkDocs([ array of Objects]);

// Get multiple documents
// const docs = await db.allDocs({
//   include_docs: true,
//   keys: ['patient_001', 'patient_002', 'patient_003']
// });


// Find documents with conditions
// const patients = await db.find({
//   selector: {
//     age: { $gt: 25 },
//     name: { $regex: /^أحمد/ }
//   },
//   sort: ['age'],
//   limit: 10
// });

// Find all documents
// const allPatients = await db.find({
//   selector: {}
// });






//==========================================================
// 11. ERROR HANDLING
// try {
//   const doc = await db.get('non_existent_id');
// } catch (err) {
//   if (err.status === 404) {
//     console.log('Document not found');
//   } else if (err.status === 409) {
//     console.log('Document conflict');
//   } else {
//     console.error('Database error:', err);
//   }
// }
//==========================================================

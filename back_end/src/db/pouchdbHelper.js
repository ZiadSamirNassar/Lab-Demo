const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const url = process.env.NeDB;

// إنشاء المجلد إذا مش موجود
if (!fs.existsSync(url)) {
  fs.mkdirSync(url, { recursive: true });
}

// 🧪 قاعدة بيانات أنواع التحاليل
const testTypesDB = new PouchDB(path.join(url, 'test_types'));

// 🧾 قاعدة بيانات نتائج التحاليل الفعلية
const testResultsDB = new PouchDB(path.join(url, 'test_results'));

// ✅ إنشاء فهرس للفيلد "name"
testTypesDB.createIndex({ index: { fields: ['name'] } }).catch(console.error);

function validate_TestType_Object_And_Required_Fields(doc) {
  if (!doc.name || typeof doc.name !== 'string') {
    return 'Field "name" is required and must be a string.';
  }
  if (typeof doc.isGroup !== 'boolean') {
    return 'Field "isGroup" is required and must be a boolean.';
  }
  if (!Array.isArray(doc.fields)) {
    return 'Field "fields" must be an array.';
  }
  return null;
}

function validate_TestResults_Object_And_Required_Fields(doc) {
  if (!doc.patientTestId || typeof doc.patientTestId !== 'number') {
    return 'Field "patientTestId" is required and must be a number.';
  }
  if (typeof doc.testTypeName !== 'string') {
    return 'Field "testTypeName" is required and must be a string.';
  }
  if (!Array.isArray(doc.result)) {
    return 'Field "result" must be an array.';
  }
  return null;
}

async function insertTestType(doc) {
  try {
    const error = validate_TestType_Object_And_Required_Fields(doc);
    if (error) return console.error(error);

    const existing = await testTypesDB.find({
      selector: { name: doc.name }
    });

    if (existing.docs.length > 0) {
      return console.error('Document already exists with same name.');
    }

    await testTypesDB.post(doc);
    console.log(`✅ Inserted testType: ${doc.name}`);
  } catch (err) {
    console.error('Error inserting test type:', err);
  }
}

async function insertManyTestTypes(docs) {
  if (!Array.isArray(docs)) {
    return console.error('Input must be an array');
  }

  for (const doc of docs) {
    await insertTestType(doc);
  }
}


async function insertTestResult(doc) {
  try {
    const error = validate_TestResults_Object_And_Required_Fields(doc);
    if (error) return console.error(error);

    const existing = await testResultsDB.find({
      selector: { patientTestId: doc.patientTestId }
    });

    if (existing.docs.length > 0) {
      return console.error(`❌ patientTestId ${doc.patientTestId} already exists.`);
    }

    await testResultsDB.post(doc);
    console.log(`✅ Inserted test result for patientTestId: ${doc.patientTestId}`);
  } catch (err) {
    console.error('Error inserting test result:', err);
  }
}

async function insertManyTestResults(docs) {
  if (!Array.isArray(docs)) {
    return console.error('Input must be an array.');
  }

  for (const doc of docs) {
    await insertTestResult(doc);
  }
}

module.exports = {
  insertTestType,
  insertManyTestTypes,
  insertTestResult,
  insertManyTestResults,
};

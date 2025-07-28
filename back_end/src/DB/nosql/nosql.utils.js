import path from 'node:path';
import PouchDB from 'pouchdb';
import { fileURLToPath } from 'url';

const { default: pouchdbFind } = await import('pouchdb-find');
PouchDB.plugin(pouchdbFind);

// simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createBenchDB(name) {
  const dbPath = path.resolve(path.join(__dirname, '/db'), name);
  return new PouchDB(dbPath);
}

const testResultsDB = createBenchDB('test_results');
const testTypesDB = createBenchDB('test_types');


export {
  testResultsDB,
  testTypesDB,
};
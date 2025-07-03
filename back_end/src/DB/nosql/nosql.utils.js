const path = require('node:path');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));


function createBenchDB(name) {
  const dbPath = path.resolve(__dirname, name);
  return new PouchDB(dbPath);
}

module.exports = {
  createBenchDB,
};
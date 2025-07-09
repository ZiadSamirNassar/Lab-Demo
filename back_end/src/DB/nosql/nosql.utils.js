const path = require('node:path');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));


function createBenchDB(name) {
  const dbPath = path.resolve(path.join(__dirname, '/db'), name);
  return new PouchDB(dbPath);
}

module.exports = {
  createBenchDB,
};
// 📁 src/DataBase/index.js
module.exports = {
  ...require('./sql/sql.module'),
  ...require('./nosql/nosql.module'),
};
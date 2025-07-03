const { sqldb, createTables } = require('./sql.utils');
createTables(); // إنشاء الجداول عند تشغيل الموديول
module.exports = { sqldb };


// Prepare statement for reuse (better performance)
// const insertUser = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
// const getUserById = db.prepare('SELECT * FROM users WHERE id = ?');
// const getAllUsers = db.prepare('SELECT * FROM users');

// Single insert
// const result = insertUser.run('أحمد محمد', 'ahmed@email.com');

// Multiple inserts with transaction
// const insertMany = db.transaction((users) => {
//   for (const user of users) {
//     insertUser.run(user.name, user.email);
//   }
// });
// const users = [
//   { name: 'علي أحمد', email: 'ali@email.com' },
//   { name: 'فاطمة محمد', email: 'fatma@email.com' }
// ];
// insertMany(users);


// 6. UPDATE & DELETE
// const updateUser = db.prepare('UPDATE users SET email = ? WHERE id = ?');
// const deleteUser = db.prepare('DELETE FROM users WHERE id = ?');

// updateUser.run('new-email@email.com', 1);
// deleteUser.run(1);
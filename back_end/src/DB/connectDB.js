import Sequelize from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import PouchDB from 'pouchdb';

// simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, './sql/lab.db'),
    logging: false,
});
export const connectSqlDB = () => {

    sequelize.sync({  }); // إنشاء الجداول عند تشغيل الموديول
};

export const createBenchDB = (name) => {
    const dbPath = path.resolve(path.join(__dirname, './nosql/db'), name);
    return new PouchDB(dbPath);
}

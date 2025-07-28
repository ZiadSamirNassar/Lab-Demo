import Sequelize from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

// simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, 'lab.db'),
  logging: false,
});

export default sequelize;

import {sequelize, Patient, PatientTest, ApplicationLicenses} from './sql.utils.js';
sequelize.sync({  }); // إنشاء الجداول عند تشغيل الموديول
export {
    Patient,
    PatientTest,
    ApplicationLicenses
};
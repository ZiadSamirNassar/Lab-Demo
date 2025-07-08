const {sequelize, Patient, PatientTest, ApplicationLicenses} = require('./sql.utils');
sequelize.sync({}); // إنشاء الجداول عند تشغيل الموديول
module.exports = { 
    Patient,
    PatientTest,
    ApplicationLicenses
};
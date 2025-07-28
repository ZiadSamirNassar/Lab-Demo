// 📁 src/DataBase/index.js
import {
    testResultsDB,
    testTypesDB,
    testTypeSchema,
    testTypeUpdateSchema,
    createTestResultForeTestType,
    updateTestResultFields
} from './nosql/nosql.module.js';
import {
    Patient,
    PatientTest,
    ApplicationLicenses
} from './sql/sql.module.js';
export {
    testResultsDB,
    testTypesDB,
    testTypeSchema,
    testTypeUpdateSchema,
    createTestResultForeTestType,
    updateTestResultFields,
    Patient,
    PatientTest,
    ApplicationLicenses
};
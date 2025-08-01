import {connectSqlDB} from "./connectDB.js";
import {Patient, PatientTest, ApplicationLicenses} from "./sql/sql.models.js";
import { createTestResultForeTestType, updateTestResultFields } from "./nosql/nosql.repository.js";
import { createBenchDB } from "./connectDB.js";

connectSqlDB();
const testResultsDB = createBenchDB('test_results');
const testTypesDB = createBenchDB('test_types');

export {
    testResultsDB,
    testTypesDB,
    createTestResultForeTestType,
    updateTestResultFields,
    Patient,
    PatientTest,
    ApplicationLicenses
};
import {DataTypes} from "sequelize"
import sequelize from "./sequelize.config.js"

const Patient = sequelize.define("patients", {
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  gender: { type: DataTypes.ENUM('male', 'female'), defaultValue: 'male' },
  phone: { type: DataTypes.STRING },
},{
  timestamps: true
})

const PatientTest = sequelize.define("patient_tests",{
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  testTypeId: { type: DataTypes.STRING, allowNull: false },
  resultId: { type: DataTypes.STRING, allowNull: false },
},{
  timestamps: true
})

const ApplicationLicenses = sequelize.define("applicationLicenses",{
    license_number: {type: DataTypes.TEXT},
    license_type: {type: DataTypes.TEXT},
    status: {type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active'},
    start: {type: DataTypes.DATE, allowNull: false},
    end: {type: DataTypes.DATE, allowNull: false}
},{
  timestamps: true
})

Patient.hasMany(PatientTest, {foreignKey: 'patientId'});
PatientTest.belongsTo(Patient);

export {
  sequelize,
  Patient,
  PatientTest,
  ApplicationLicenses
}
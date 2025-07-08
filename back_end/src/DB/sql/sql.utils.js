const {DataTypes} = require("sequelize")
const sequelize = require("./sequelize.config")

const Patient = sequelize.define("patients", {
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  gender: { type: DataTypes.ENUM('male', 'female'), defaultValue: 'male' },
  phone: { type: DataTypes.STRING },
},{
  timestamps: true
})

const PatientTest = sequelize.define("patient_tests",{
  patient_id: { type: DataTypes.INTEGER, allowNull: false },
  test_type_id: { type: DataTypes.STRING, allowNull: false },
  test_type_name: { type: DataTypes.STRING, allowNull: false },
  result_id: { type: DataTypes.STRING },
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

PatientTest.belongsTo(Patient, { foreignKey: 'patient_id', onDelete: 'CASCADE' });

module.exports = {
  sequelize,
  Patient,
  PatientTest,
  ApplicationLicenses
}
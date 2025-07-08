const { Router } = require("express")
const { getAllPatients, getPatientByid, createPatient, updatedPatient } = require('./patient.service')

const patientRouter = Router();

// =====================Get All Patients=======================
patientRouter.get('/', getAllPatients)

// =====================Get Patient By id=======================
patientRouter.get('/:id', getPatientByid)


// ====================create patient===========================
patientRouter.post('/', createPatient)

// ====================Update Patient Data========================
patientRouter.put('/:id', updatedPatient)

module.exports = patientRouter;
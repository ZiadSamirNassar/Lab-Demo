import { Router } from "express"
import { getAllPatients, getPatientByid, createPatient, updatedPatient } from './patient.service.js'

const patientRouter = Router();

// =====================Get All Patients=======================
patientRouter.get('/', getAllPatients)

// =====================Get Patient By id=======================
patientRouter.get('/:id', getPatientByid)


// ====================create patient===========================
patientRouter.post('/', createPatient)

// ====================Update Patient Data========================
patientRouter.put('/:id', updatedPatient)

export default patientRouter;
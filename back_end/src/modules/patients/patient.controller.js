import { Router } from "express"
import { getAllPatients, getPatientByid, createPatient, updatedPatient } from './patient.service.js'
import { asyncHandler } from "../../utils/index.js"

const patientRouter = Router();

// =====================Get All Patients=======================
patientRouter.get('/', asyncHandler(getAllPatients))

// =====================Get Patient By id=======================
patientRouter.get('/:id', asyncHandler(getPatientByid))


// ====================create patient===========================
patientRouter.post('/', asyncHandler(createPatient))

// ====================Update Patient Data========================
patientRouter.put('/:id', asyncHandler(updatedPatient))

export default patientRouter;
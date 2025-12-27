import { Router } from "express"
import { getAllPatients, getPatientByid, createPatient, updatedPatient } from './patient.service.js'
import { asyncHandler, isValid } from "../../utils/index.js"
import { createPatientSchema, updatePatientSchema } from "./patient.validation.js"

const patientRouter = Router();

// =====================Get All Patients=======================
patientRouter.get(
    '/',
    asyncHandler(getAllPatients)
)

// =====================Get Patient By id=======================
patientRouter.get(
    '/:id',
    asyncHandler(getPatientByid)
)


// ====================create patient===========================
patientRouter.post(
    '/',
    asyncHandler(isValid(createPatientSchema)),
    asyncHandler(createPatient)
)

// ====================Update Patient Data========================
patientRouter.put(
    '/:id',
    asyncHandler(isValid(updatePatientSchema)),
    asyncHandler(updatedPatient)
)

export default patientRouter;
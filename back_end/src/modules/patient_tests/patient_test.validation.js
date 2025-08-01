import { z } from "zod";

const createTestForPatientFromTestTypeSchema = z.object({
    patientId: z.string(),
    testTypeId: z.string()
})

const allTestsForPatientSchema = z.object({
    patientId: z.string()
})



export {
    createTestForPatientFromTestTypeSchema,
    allTestsForPatientSchema
}

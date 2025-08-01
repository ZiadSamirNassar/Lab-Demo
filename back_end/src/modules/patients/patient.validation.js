import { z } from "zod";

const createPatientSchema = z.object({
    name: z.string(),
    age: z.number(),
    gender: z.enum(['male', 'female']).default('male'),
    phone: z.string().optional().default('0000'),
})

const updatePatientSchema = z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    gender: z.enum(['male', 'female']).optional(),
    phone: z.string().optional(),
})

export { createPatientSchema, updatePatientSchema }

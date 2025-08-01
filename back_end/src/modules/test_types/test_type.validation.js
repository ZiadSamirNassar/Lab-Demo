import { z } from "zod";

const date = new Date()
const fieldSchema = z.object({
    label: z.string(),
    unit: z.string().optional(),
    normal: z.string().optional(),
    type: z.string().optional(),
    result: z.string()
})

const createTestTypeSchema = z.object({
    name: z.string(),
    category: z.string().optional().default('general'),
    fields: z.array(fieldSchema),
    createdAt: z.string().default(date.toISOString().split("T")[0])
})

const updateTestTypeSchema = z.object({
    name: z.string().optional(),
    category: z.string().optional(),
    fields: z.array(fieldSchema).optional(),
    updatedAt: z.string().default(date.toISOString().split("T")[0])
})

export { updateTestTypeSchema, createTestTypeSchema }

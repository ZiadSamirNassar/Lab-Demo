import { z } from "zod";

const fieldSchema = z.object({
    label: z.string(),
    unit: z.string().optional(),
    normal: z.string().optional(),
    type: z.string().optional(),
    result: z.string()
})

const updateTestResultSchema = z.object({
    fields: z.array(fieldSchema)
})


export { updateTestResultSchema }
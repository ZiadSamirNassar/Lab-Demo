const { z } = require('zod');

const date = new Date()
const fieldSchema = z.object({
  label: z.string(),
  unit: z.string().optional(),
  normal: z.string().optional(),
  type: z.string().optional(),
});

const testTypeSchema = z.object({
  _id: z.string(),                 // لازم يكون موجود
  name: z.string(),               // لازم يكون موجود
  fields: z.array(fieldSchema),   // لازم تكون array من الحقول
  category: z.string().optional().default('general'),
  createdAt: z.string().default(date.toISOString().split("T")[0])
});

const testTypeUpdateSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  fields: z.array(fieldSchema).optional()
});

module.exports = {
  testTypeSchema,
  testTypeUpdateSchema
};

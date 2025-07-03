const { z } = require('zod');

const fieldSchema = z.object({
  label: z.string(),
  unit: z.string().optional(),
  normal: z.string().optional(),
  type: z.string().optional(),
  options: z.array(z.string()).optional()
});

const testTypeSchema = z.object({
  _id: z.string(),                 // لازم يكون موجود
  name: z.string(),               // لازم يكون موجود
  fields: z.array(fieldSchema),   // لازم تكون array من الحقول
  category: z.string().optional().default('general'),
  isActive: z.boolean().optional().default(true),
  createdAt: z.string().optional()
});

module.exports = {
  testTypeSchema,
};

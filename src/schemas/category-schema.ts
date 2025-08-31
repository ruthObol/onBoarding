import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export const CreateCategoryRequestSchema = z.object({ body: CategorySchema });

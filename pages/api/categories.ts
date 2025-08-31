import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { CreateCategoryRequestSchema } from '@/src/schemas/category-schema';
import {
  createCategoryHandler,
  getCategoriesHandler,
} from '@/src/server/category/handlers/category-handler';
import { errorHandler } from '@/src/server/middlewares/errorHandler';
import { validateRequest } from '@/src/server/middlewares/validation';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(getCategoriesHandler);
router.post(
  validateRequest(CreateCategoryRequestSchema),
  createCategoryHandler
);

export default router.handler({ onError: errorHandler });

import { errorHandler } from '@/server/middlewares/errorHandler';
import {
  createCategory,
  getCategories,
} from '@/server/post/dal/categories-dal';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

async function getHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  const categories = await getCategories();
  res.status(200).json(categories);
}

async function postHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { name } = req.body;
  const category = await createCategory(name);
  res.status(201).json(category);
}

router.get(getHandler);
router.post(postHandler);

export default router.handler({ onError: errorHandler });

import { errorHandler } from '@/server/middlewares/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { getPosts } from '../../server/post/dal/posts-dal';
import { Post } from '@prisma/client';

const router = createRouter<NextApiRequest, NextApiResponse>();

async function handler(req: NextApiRequest, res: NextApiResponse<Post[]>) {
  const { search, categories, difficulty } = req.query;

  const filters = {
    search: typeof search === 'string' ? search : undefined,
    categories: Array.isArray(categories)
      ? categories
      : categories
        ? [categories]
        : undefined,
    difficulty: typeof difficulty === 'string' ? difficulty : undefined,
  };

  const posts = await getPosts(filters);
  res.status(200).json(posts);
}

router.get(handler);

export default router.handler({ onError: errorHandler });

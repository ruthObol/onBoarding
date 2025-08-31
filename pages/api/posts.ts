import { errorHandler } from '@/server/middlewares/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { createPost, getPosts } from '../../server/post/dal/posts-dal';
import { Post } from '@prisma/client';
import { CreatePostRequestSchema, PostSchema } from '@/schemas/post-schema';
import { validateRequest } from '@/server/middlewares/validation';

const router = createRouter<NextApiRequest, NextApiResponse>();

async function getHandler(req: NextApiRequest, res: NextApiResponse<Post[]>) {
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

async function postHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  const postData = req.body;
  const post = await createPost({...postData})
  res.status(201).json(post);
}

router.get(getHandler);
router.post(validateRequest(CreatePostRequestSchema),
  postHandler);

export default router.handler({ onError: errorHandler });

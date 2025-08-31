import { CreatePostRequestSchema } from '@/src/schemas/post-schema';
import { errorHandler } from '@/src/server/middlewares/errorHandler';
import { validateRequest } from '@/src/server/middlewares/validation';
import { createPostHandler, getPostsHandler } from '@/src/server/post/handlers/post-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(getPostsHandler);
router.post(validateRequest(CreatePostRequestSchema),
  createPostHandler);

export default router.handler({ onError: errorHandler });

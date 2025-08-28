import { errorHandler } from '@/server/middlewares/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { createPost } from '../../../server/post/dal/posts-dal';
import '../../../types/api';
import { PostSchemaType } from '@/types';

const router = createRouter<NextApiRequest, NextApiResponse>();

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const postData = req.body;

  const post = await createPost({
    title: postData.title,
    content: postData.content,
    legoModelNumber: postData.legoModelNumber,
    pieces: postData.pieces || undefined,
    imageUrl: postData.imageUrl || '',
    contactPhone: postData.contactPhone,
    buildDifficulty: postData.buildDifficulty,
    publisher: postData.publisher,
    categoryIds: postData.categoryIds,
  });

  res.status(201).json(post);
}

router.post(handler);

export default router.handler({ onError: errorHandler });

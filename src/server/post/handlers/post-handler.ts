import { NextApiRequest, NextApiResponse } from 'next';

import { Post, PostSchemaType } from '@/src/types';

import { createPost, getPosts } from '../dal/posts-dal';

export const getPostsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) => {
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
};

interface CreatePostRequest extends NextApiRequest {
  body: PostSchemaType;
}

export const createPostHandler = async (
  req: CreatePostRequest,
  res: NextApiResponse
) => {
  const postData = req.body;
  const post = await createPost(postData);
  res.status(201).json(post);
};

import {
  PostCategory,
  Category as PrismaCategory,
  Post as PrismaPost,
} from '@prisma/client';
import { z } from 'zod';

import { PostSchema } from '@/src/schemas/post-schema';

export type Post = PrismaPost & {
  postCategories: PostCategory[];
};

export type PostSchemaType = z.infer<typeof PostSchema>;

export interface PostFilters {
  search?: string;
  categories?: string[];
  difficulty?: string;
}

export type Category = PrismaCategory;

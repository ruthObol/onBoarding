import { PostSchema } from "@/src/schemas/post-schema";
import { PostCategory, Post as PrismaPost } from "@prisma/client";
import { z } from "zod";

export type Post = PrismaPost & {
  postCategories: PostCategory[];
};

export type PostSchemaType = z.infer<typeof PostSchema>;

export interface PostFilters {
  search?: string;
  categories?: string[];
  difficulty?: string;
}


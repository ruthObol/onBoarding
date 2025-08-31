import { Category, PostCategory, Post as PrismaPost } from "@prisma/client";


export type Post = PrismaPost & {
  postCategories: (PostCategory & {
    category: Category;
  })[];
};//TODO




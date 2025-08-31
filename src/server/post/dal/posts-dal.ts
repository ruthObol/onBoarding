import { Prisma } from '@prisma/client';

import { PostFilters, PostSchemaType } from '@/src/types';

import prismaClient from '../../lib/prisma';

export const getPosts = (filters?: PostFilters) => {
  const where: Prisma.PostWhereInput = {
    deletedAt: null,
  };

  if (filters?.search) {
    where.title = {
      contains: filters.search,
      mode: 'insensitive',
    };
  }

  if (filters?.difficulty) {
    where.buildDifficulty = filters.difficulty as any;
  }

  if (filters?.categories && filters.categories.length > 0) {
    where.postCategories = {
      some: {
        categoryId: {
          in: filters.categories.map(id => parseInt(id)),
        },
      },
    };
  }

  return prismaClient.post.findMany({
    where,
    include: {
      postCategories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const createPost = async (postData: PostSchemaType) => {
  const {
    title,
    contactPhone,
    content,
    legoModelNumber,
    pieces,
    imageUrl,
    buildDifficulty,
    publisher,
    categoryIds,
  } = postData;

  return prismaClient.post.create({
    data: {
      title,
      content,
      legoModelNumber,
      pieces,
      imageUrl,
      contactPhone,
      buildDifficulty,
      publisher,
      postCategories:
        categoryIds && categoryIds.length > 0
          ? {
              create: categoryIds.map(categoryId => ({
                categoryId,
              })),
            }
          : undefined,
    },
    include: {
      postCategories: {
        include: {
          category: true,
        },
      },
    },
  });
};

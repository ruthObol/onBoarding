import prismaClient from '@/server/lib/prisma';
import { BuildDifficulty } from '@prisma/client';

interface PostFilters {
  search?: string;
  categories?: string[];
  difficulty?: string;
}

export const getPosts = (filters?: PostFilters) => {
  const where: any = {
    deletedAt: null,
  };

  if (filters?.search) {
    where.title = {
      contains: filters.search,
      mode: 'insensitive',
    };
  }

  if (filters?.difficulty) {
    where.buildDifficulty = filters.difficulty;
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

interface CeatePostDalProps {
  title: string;
  content: string;
  legoModelNumber: string;
  pieces?: number;
  imageUrl: string;
  contactPhone: string;
  buildDifficulty: BuildDifficulty;
  publisher: string;
  categoryIds?: number[];
}

export const createPost = async (postData: CeatePostDalProps) => {

  const { title, contactPhone, content, legoModelNumber, pieces, imageUrl, buildDifficulty, publisher, categoryIds } = postData;

  return prismaClient.post.create({
    data:
    {
      title,
      content,
      legoModelNumber,
      pieces,
      imageUrl,
      contactPhone,
      buildDifficulty,
      publisher,
      postCategories: categoryIds && categoryIds.length > 0 ? {
        create: categoryIds.map(categoryId => ({
          categoryId
        }))
      } : undefined,
    },
    include: {
      postCategories: {
        include: {
          category: true
        }
      }
    }
  });

}

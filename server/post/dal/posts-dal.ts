import { PrismaClient } from '@prisma/client';
import { Post } from '../../../types';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

// Log queries to console
prisma.$on('query', (e: any) => {
  console.log('Query: ' + e.query);
  console.log('Params: ' + e.params);
  console.log('Duration: ' + e.duration + 'ms');
});

interface PostFilters {
  search?: string;
  categories?: string[];
  difficulty?: string;
}

export const getPosts = (filters?: PostFilters) => {
  const where: any = {
    deletedAt: null,
  };

  // Search filter
  if (filters?.search) {
    where.title = {
      contains: filters.search,
      mode: 'insensitive' as const,
    };
  }

  // Difficulty filter
  if (filters?.difficulty) {
    where.buildDifficulty = filters.difficulty;
  }

  // Category filter
  if (filters?.categories && filters.categories.length > 0) {
    where.postCategories = {
      some: {
        categoryId: {
          in: filters.categories.map(id => parseInt(id)),
        },
      },
    };
  }

  return prisma.post.findMany({
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


export async function getAllPostIds(): Promise<Array<{ params: { id: string } }>> {
  try {
    // Get all published post IDs from database
    const posts = await prisma.post.findMany({
      where: {
        // published: true,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    // Return in the format expected by Next.js
    return posts.map((post: any) => ({
      params: {
        id: post.id.toString(),
      },
    }));
  } catch (error) {
    console.error('Error fetching post IDs:', error);
    return [];
  }
}

export async function getPost(id: string): Promise<Post> {
  try {
    // Get the specific post from database
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(id),
        deletedAt: null,
      },
      include: {
        postCategories: {
          include: {
            category: true
          }
        }
      }
    });

    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }

    // Return in the format expected by the component
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      legoModelNumber: post.legoModelNumber,
      pieces: post.pieces,
      imageUrl: post.imageUrl,
      contactPhone: post.contactPhone,
      buildDifficulty: post.buildDifficulty,
      publisher: post.publisher,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      deletedAt: post.deletedAt,
      postCategories: post.postCategories,
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

// Helper function to create a new post
export async function createPost(postData: {
  title: string;
  content: string;
  legoModelNumber: number;
  pieces?: number;
  imageUrl: string;
  contactPhone: string;
  buildDifficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
  publisher: string;
  categoryIds?: number[];
}) {
  try {
    const post = await prisma.post.create({
      data: {
        title: postData.title,
        content: postData.content,
        legoModelNumber: postData.legoModelNumber,
        pieces: postData.pieces,
        imageUrl: postData.imageUrl,
        contactPhone: postData.contactPhone,
        buildDifficulty: postData.buildDifficulty,
        publisher: postData.publisher,
        postCategories: postData.categoryIds && postData.categoryIds.length > 0 ? {
          create: postData.categoryIds.map(categoryId => ({
            categoryId: categoryId
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
    return post;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Helper function to update a post
export async function updatePost(
  id: string,
  postData: {
    title?: string;
    content?: string;
    legoModelNumber?: number;
    pieces?: number;
    imageUrl?: string;
    contactPhone?: string;
    buildDifficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
    publisher?: string;
  }
) {
  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: postData,
    });
    return post;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

// Helper function to soft delete a post
export async function deletePost(id: string) {
  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        deletedAt: new Date(),
      },
    });
    return post;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

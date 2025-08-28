import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface CreatePost {
  title: string
  content: string
  legoModelNumber: string
  pieces?: number
  imageUrl: string
  contactPhone: string
  buildDifficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT'
}

export const getAllPosts = () => {
    return prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  
}

export const getPostById = async (id: string | number) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: typeof id === 'string' ? parseInt(id) : id }
    })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}

// Get all post IDs for static paths
export const getAllPostIds = async () => {
  try {
    const posts = await prisma.post.findMany({
      select: { id: true }
    })
    return posts.map((post) => ({
      params: {
        id: post.id.toString(),
      },
    }))
  } catch (error) {
    console.error('Error fetching post IDs:', error)
    throw error
  }
}

// Create a new post
export const createPost = async (data: CreatePost) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        legoModelNumber: data.legoModelNumber,
        pieces: data.pieces,
        imageUrl: data.imageUrl,
        contactPhone: data.contactPhone,
        buildDifficulty: data.buildDifficulty,
      }
    })
    return post
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

import { PrismaClient } from '@prisma/client';

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

export const getCategories = () => prisma.category.findMany({
  orderBy: {
    name: 'asc',
  },
});

export const getCategoryById = (id: number) => prisma.category.findUnique({
  where: { id },
});

export const createCategory = (name: string) => prisma.category.create({
  data: { name },
});

export const updateCategory = (id: number, name: string) => prisma.category.update({
  where: { id },
  data: { name },
});

export const deleteCategory = (id: number) => prisma.category.delete({
  where: { id },
});

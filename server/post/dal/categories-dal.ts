import prismaClient from "@/server/lib/prisma";

export const getCategories = () => prismaClient
.category.findMany({
  orderBy: {
    name: 'asc',
  },
});

export const getCategoryById = (id: number) => prismaClient.category.findUnique({
  where: { id },
});

export const createCategory = (name: string) => prismaClient.category.create({
  data: { name },
});

export const updateCategory = (id: number, name: string) => prismaClient.category.update({
  where: { id },
  data: { name },
});

export const deleteCategory = (id: number) => prismaClient.category.delete({
  where: { id },
});

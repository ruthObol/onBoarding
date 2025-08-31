import prismaClient from "../../lib/prisma";

export const getCategories = () => prismaClient
.category.findMany({
  orderBy: {
    name: 'asc',
  },
});

export const createCategory = (name: string) => prismaClient.category.create({
  data: { name },
});


import { NextApiRequest, NextApiResponse } from 'next';

import { createCategory, getCategories } from '../dal/categories-dal';

export const getCategoriesHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse
) => {
  const categories = await getCategories();
  res.status(200).json(categories);
};

interface CreateCategoryRequest extends NextApiRequest {
  body: { name: string };
}

export const createCategoryHandler = async (
  req: CreateCategoryRequest,
  res: NextApiResponse
) => {
  const { name } = req.body;
  const category = await createCategory(name);
  res.status(201).json(category);
};

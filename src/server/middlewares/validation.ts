import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequest =
  (schema: AnyZodObject) =>
  async (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(error);
      }
      console.error(
        error,
        'An error occurred while trying to validate the request'
      );
      return res.status(500);
    }
    return next(req, res);
  };

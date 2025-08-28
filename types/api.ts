import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    validatedBody?: any;
    validatedQuery?: any;
    validatedParams?: any;
  }
}

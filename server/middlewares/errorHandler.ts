import { NextApiRequest, NextApiResponse } from "next";

export class HttpError extends Error {
  public status: number;

  constructor(
    status: number,
    message: string,
  ) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}

export async function errorHandler(
  error: unknown,
  req: NextApiRequest,
  res: NextApiResponse
) {
  let status = 500;
  let message = 'Internal Server Error';

  if (isHttpError(error)) {
    status = error.status;
    message = error.message;
  }

  res.status(status).json(message);
}
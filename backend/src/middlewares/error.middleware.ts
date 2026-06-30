import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import { AppError } from "@utils/error.util";

export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;

  if (!(error instanceof AppError)) {
    error = new AppError("internal server error", 500);
  }

  res.status(error.statusCode).json({
    success: false,
    status: error.status,
    message: error.message,
    error : error
  });
};

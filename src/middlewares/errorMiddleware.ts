import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the error is an instance of CustomError
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(500).send({
    errors: [{ message: "Something went wrong" }],
  });
};

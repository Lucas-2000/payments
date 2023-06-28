import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../error/AppError";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppError("Token is missing!");
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, "39b2a5ca-4624-4af6-939c-051e6daa9fef");

    return next();
  } catch (err) {
    throw new AppError("Invalid token!");
  }
}

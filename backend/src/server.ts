import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./error/AppError";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use(
  (err: AppError, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`,
    });
  }
);

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});

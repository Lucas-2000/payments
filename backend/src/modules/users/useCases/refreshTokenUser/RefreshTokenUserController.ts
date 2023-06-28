import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";
import { Request, Response } from "express";

export class RefreshTokenUserController {
  async handle(req: Request, res: Response) {
    const { refresh_token } = req.body;

    const refreshTokenUserUseCase = new RefreshTokenUserUseCase();

    const token = await refreshTokenUserUseCase.execute(refresh_token);

    return res.status(201).json(token);
  }
}

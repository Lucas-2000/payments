import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { Request, Response } from "express";

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const token = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return res.status(201).json(token);
  }
}

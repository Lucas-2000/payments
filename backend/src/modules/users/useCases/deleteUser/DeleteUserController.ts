import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { Request, Response } from "express";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { email } = req.params;

    const deleteUserUseCase = new DeleteUserUseCase();

    const result = await deleteUserUseCase.execute({
      email,
    });

    return res.status(201).json(result);
  }
}

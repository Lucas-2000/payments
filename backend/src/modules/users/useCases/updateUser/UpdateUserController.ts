import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { email } = req.params;
    const {
      first_name,
      last_name,
      birth_date,
      cep,
      address,
      city,
      uf,
      password,
    } = req.body;

    const updateUserUseCase = new UpdateUserUseCase();

    const result = await updateUserUseCase.execute({
      first_name,
      last_name,
      birth_date,
      cep,
      address,
      city,
      uf,
      email,
      password,
    });

    return res.status(201).json(result);
  }
}

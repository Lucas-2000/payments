import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const {
      first_name,
      last_name,
      birth_date,
      cep,
      address,
      city,
      uf,
      email,
      password,
    } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute({
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

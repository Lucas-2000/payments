import { Request, Response } from "express";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

export class CreateCustomerController {
  async handle(req: Request, res: Response) {
    const {
      first_name,
      last_name,
      cep,
      address,
      city,
      uf,
      email,
      phone,
      userId,
    } = req.body;

    const createCustomerUseCase = new CreateCustomerUseCase();

    const customer = await createCustomerUseCase.execute({
      first_name,
      last_name,
      cep,
      address,
      city,
      uf,
      email,
      phone,
      userId,
    });

    return res.status(201).json(customer);
  }
}

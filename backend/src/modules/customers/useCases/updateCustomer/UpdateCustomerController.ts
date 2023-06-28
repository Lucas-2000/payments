import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";
import { Request, Response } from "express";

export class UpdateCustomerController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { first_name, last_name, cep, address, city, uf, email, phone } =
      req.body;

    const updateCustomerUseCase = new UpdateCustomerUseCase();

    const customerUpdated = await updateCustomerUseCase.execute({
      id,
      first_name,
      last_name,
      cep,
      address,
      city,
      uf,
      email,
      phone,
    });

    return res.status(201).json(customerUpdated);
  }
}

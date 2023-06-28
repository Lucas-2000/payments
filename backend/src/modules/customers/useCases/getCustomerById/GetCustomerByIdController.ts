import { Request, Response } from "express";
import { GetCustomerByIdUseCase } from "./GetCustomerByIdUseCase";

export class GetCustomerByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getCustomerByIdUseCase = new GetCustomerByIdUseCase();

    const customer = await getCustomerByIdUseCase.execute({ id });

    return res.status(201).json(customer);
  }
}

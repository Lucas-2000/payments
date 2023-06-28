import { GetAllCustomersUseCase } from "./GetAllCustomersUseCase";
import { Request, Response } from "express";

export class GetAllCustomersController {
  async handle(req: Request, res: Response) {
    const getAllCustomersUseCase = new GetAllCustomersUseCase();

    const customers = await getAllCustomersUseCase.execute();

    return res.status(201).json(customers);
  }
}

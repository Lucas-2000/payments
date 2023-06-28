import { Request, Response } from "express";
import { GetAllInvoicesUseCase } from "./GetAllInvoicesUseCase";

export class GetAllInvoicesController {
  async handle(req: Request, res: Response) {
    const getAllInvoicesUseCase = new GetAllInvoicesUseCase();

    const invoices = await getAllInvoicesUseCase.execute();

    return res.status(201).json(invoices);
  }
}

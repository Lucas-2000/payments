import { Request, Response } from "express";
import { GetInvoicesByIdUseCase } from "./GetInvoicesByIdUseCase";

export class GetInvoicesByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getInvoicesByIdUseCase = new GetInvoicesByIdUseCase();

    const invoiceUpdated = await getInvoicesByIdUseCase.execute({ id });

    return res.status(201).json(invoiceUpdated);
  }
}

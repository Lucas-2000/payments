import { Request, Response } from "express";
import { DeleteInvoiceUseCase } from "./DeleteInvoiceUseCase";

export class DeleteInvoiceController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteInvoiceUseCase = new DeleteInvoiceUseCase();

    const invoiceDeleted = await deleteInvoiceUseCase.execute({ id });

    return res.status(201).json(invoiceDeleted);
  }
}

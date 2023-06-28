import { Request, Response } from "express";
import { UpdateInvoiceUseCase } from "./UpdateInvoiceUseCase";

export class UpdateInvoiceController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { description, value, payment_method, due_date, is_paid } = req.body;

    const updateInvoiceUseCase = new UpdateInvoiceUseCase();

    const invoiceUpdated = await updateInvoiceUseCase.execute({
      id,
      description,
      value,
      payment_method,
      due_date,
      is_paid,
    });

    return res.status(201).json(invoiceUpdated);
  }
}

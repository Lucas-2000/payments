import { Request, Response } from "express";
import { CreateInvoiceUseCase } from "./CreateInvoiceUseCase";

export class CreateInvoiceController {
  async handle(req: Request, res: Response) {
    const {
      description,
      value,
      payment_method,
      due_date,
      is_paid,
      userId,
      customerId,
    } = req.body;

    const createInvoiceUseCase = new CreateInvoiceUseCase();

    const invoice = await createInvoiceUseCase.execute({
      description,
      value,
      payment_method,
      due_date,
      is_paid,
      userId,
      customerId,
    });

    return res.status(201).json(invoice);
  }
}

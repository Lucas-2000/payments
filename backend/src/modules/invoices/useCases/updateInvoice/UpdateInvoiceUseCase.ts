import { Invoices } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import { UpdateInvoiceDTO } from "../../dtos/UpdateInvoiceDTO";

export class UpdateInvoiceUseCase {
  async execute({
    id,
    description,
    value,
    payment_method,
    due_date,
    is_paid,
  }: UpdateInvoiceDTO): Promise<Invoices> {
    const invoiceExists = await prisma.invoices.findUnique({
      where: { id },
    });

    if (!invoiceExists) {
      throw new AppError("Invoice not found!");
    }

    const invoice = await prisma.invoices.update({
      where: {
        id,
      },
      data: {
        description,
        value,
        payment_method,
        due_date,
        is_paid,
      },
    });

    return invoice;
  }
}

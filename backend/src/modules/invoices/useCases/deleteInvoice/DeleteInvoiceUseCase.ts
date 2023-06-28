import { Invoices } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import { DeleteInvoiceDTO } from "../../dtos/DeleteInvoiceDTO";

export class DeleteInvoiceUseCase {
  async execute({ id }: DeleteInvoiceDTO): Promise<Invoices> {
    const invoiceExists = await prisma.invoices.findUnique({
      where: { id },
    });

    if (!invoiceExists) {
      throw new AppError("Invoice not found!");
    }

    const invoiceDeleted = await prisma.invoices.delete({
      where: { id },
    });

    return invoiceDeleted;
  }
}

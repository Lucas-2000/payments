import { Invoices } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import { GetInvoicesByIdDTO } from "../../dtos/GetInvoicesByIdDTO";

export class GetInvoicesByIdUseCase {
  async execute({ id }: GetInvoicesByIdDTO): Promise<Invoices> {
    const invoice = await prisma.invoices.findUnique({
      where: { id },
    });

    if (!invoice) {
      throw new AppError("Invoice not found!");
    }

    return invoice;
  }
}

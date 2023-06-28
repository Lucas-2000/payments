import { Invoices } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";

export class GetAllInvoicesUseCase {
  async execute(): Promise<Invoices[]> {
    const invoices = await prisma.invoices.findMany();

    if (!invoices) {
      throw new AppError("Invoices not found!");
    }

    return invoices;
  }
}

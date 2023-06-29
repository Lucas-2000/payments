import { Invoices } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";

export class GetAllInvoicesUseCase {
  async execute(): Promise<Invoices[]> {
    const invoices = await prisma.invoices.findMany();

    return invoices;
  }
}

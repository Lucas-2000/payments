import { Customers } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";

export class GetAllCustomersUseCase {
  async execute(): Promise<Customers[]> {
    const customers = await prisma.customers.findMany();

    return customers;
  }
}

import { AppError } from "./../../../../error/AppError";
import { Customers } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { DeleteCustomerDTO } from "../../dtos/DeleteCustomerDTO";

export class DeleteCustomerUseCase {
  async execute({ id }: DeleteCustomerDTO): Promise<Customers> {
    const customerExists = await prisma.customers.findUnique({
      where: { id },
    });

    if (!customerExists) {
      throw new AppError("Customer not found!");
    }

    const customer = await prisma.customers.delete({
      where: { id },
    });

    return customer;
  }
}

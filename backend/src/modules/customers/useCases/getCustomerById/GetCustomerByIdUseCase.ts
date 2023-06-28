import { Customers } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import { GetCustomerByIdDTO } from "../../dtos/GetCustomerByIdDTO";

export class GetCustomerByIdUseCase {
  async execute({ id }: GetCustomerByIdDTO): Promise<Customers> {
    const customer = await prisma.customers.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new AppError("Customer not found!");
    }

    return customer;
  }
}

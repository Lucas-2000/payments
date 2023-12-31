import { Customers } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import { UpdateCustomerDTO } from "../../dtos/UpdateCustomerDTO";

export class UpdateCustomerUseCase {
  async execute({
    id,
    first_name,
    last_name,
    cep,
    address,
    city,
    uf,
    email,
    phone,
  }: UpdateCustomerDTO): Promise<Customers> {
    const customerExists = await prisma.customers.findUnique({
      where: {
        id,
      },
    });

    if (!customerExists) {
      throw new AppError("Customer not found!");
    }

    try {
      const customerUpdated = await prisma.customers.update({
        where: {
          id,
        },
        data: {
          first_name,
          last_name,
          cep,
          address,
          city,
          uf,
          email,
          phone,
        },
      });

      return customerUpdated;
    } catch (err) {
      throw new AppError("Missing fields");
    }
  }
}

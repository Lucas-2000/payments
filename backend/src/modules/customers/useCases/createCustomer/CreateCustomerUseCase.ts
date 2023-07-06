import { Customers } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateCustomerDTO } from "../../dtos/CreateCustomerDTO";

export class CreateCustomerUseCase {
  async execute({
    first_name,
    last_name,
    cep,
    address,
    city,
    uf,
    email,
    phone,
    userId,
  }: CreateCustomerDTO): Promise<Customers> {
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new AppError("User not exists!");
    }

    try {
      const customer = await prisma.customers.create({
        data: {
          first_name,
          last_name,
          cep,
          address,
          city,
          uf,
          email,
          phone,
          userId,
        },
      });
      return customer;
    } catch (err) {
      throw new AppError("Missing fields");
    }
  }
}

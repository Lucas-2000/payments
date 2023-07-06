import { Invoices } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateInvoiceDTO } from "../../dtos/CreateInvoiceDTO";

export class CreateInvoiceUseCase {
  async execute({
    description,
    value,
    payment_method,
    due_date,
    is_paid,
    userId,
    customerId,
  }: CreateInvoiceDTO): Promise<Invoices> {
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const customerExists = await prisma.customers.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customerExists) {
      throw new AppError("Customer not found!");
    }

    try {
      const invoice = await prisma.invoices.create({
        data: {
          description,
          value,
          payment_method,
          due_date,
          is_paid,
          userId,
          customerId,
        },
      });

      return invoice;
    } catch (err) {
      throw new AppError("Missing fields");
    }
  }
}

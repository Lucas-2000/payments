import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../error/AppError";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreateCustomerUseCase } from "../../../customers/useCases/createCustomer/CreateCustomerUseCase";
import { CreateInvoiceUseCase } from "../createInvoices/CreateInvoiceUseCase";
import { DeleteInvoiceUseCase } from "./DeleteInvoiceUseCase";
import { CreateInvoiceDTO } from "../../dtos/CreateInvoiceDTO";
import { CreateCustomerDTO } from "../../../customers/dtos/CreateCustomerDTO";
import { CreateUserDTO } from "../../../users/dtos/CreateUserDTO";
import { DeleteCustomerDTO } from "../../../customers/dtos/DeleteCustomerDTO";

describe("Update User Use Case", () => {
  let deleteInvoiceUseCase: DeleteInvoiceUseCase;
  let createUserUseCase: CreateUserUseCase;
  let createCustomerUseCase: CreateCustomerUseCase;
  let createInvoiceUseCase: CreateInvoiceUseCase;

  beforeAll(async () => {
    deleteInvoiceUseCase = new DeleteInvoiceUseCase();
    createUserUseCase = new CreateUserUseCase();
    createCustomerUseCase = new CreateCustomerUseCase();
    createInvoiceUseCase = new CreateInvoiceUseCase();
  });

  it("should be able to delete the invoice", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testuserdeleteinvoice@example.com",
      password: "test123",
    };

    const user = await createUserUseCase.execute(userData);

    const customerData: CreateCustomerDTO = {
      first_name: "John",
      last_name: "Doe",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testupdateinvoice@example.com",
      phone: "11911111111",
      userId: user.id,
    };

    const customer = await createCustomerUseCase.execute(customerData);

    const invoiceData: CreateInvoiceDTO = {
      description: "Test Invoice",
      value: 1,
      payment_method: "PIX",
      due_date: "2023-09-01",
      is_paid: false,
      userId: user.id,
      customerId: customer.id,
    };

    const invoice = await createInvoiceUseCase.execute(invoiceData);

    const invoiceId: DeleteCustomerDTO = {
      id: invoice.id,
    };

    const invoiceDeleted = await deleteInvoiceUseCase.execute(invoiceId);

    expect(invoiceDeleted).toHaveProperty("id");
  });

  it("should be able to delete the invoice if invoice not found", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testuserdeleteinvoice1@example.com",
      password: "test123",
    };

    const user = await createUserUseCase.execute(userData);

    const customerData: CreateCustomerDTO = {
      first_name: "John",
      last_name: "Doe",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testupdateinvoice@example.com",
      phone: "11911111111",
      userId: user.id,
    };

    const customer = await createCustomerUseCase.execute(customerData);

    const invoiceData: CreateInvoiceDTO = {
      description: "Test Invoice",
      value: 1,
      payment_method: "PIX",
      due_date: "2023-09-01",
      is_paid: false,
      userId: user.id,
      customerId: customer.id,
    };

    const invoice = await createInvoiceUseCase.execute(invoiceData);

    const invoiceId: DeleteCustomerDTO = {
      id: "invoice.id",
    };

    await expect(deleteInvoiceUseCase.execute(invoiceId)).rejects.toEqual(
      new AppError("Invoice not found!")
    );
  });

  afterAll(async () => {
    const usersToDelete = [
      "testuserdeleteinvoice@example.com",
      "testuserdeleteinvoice1@example.com",
    ];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});

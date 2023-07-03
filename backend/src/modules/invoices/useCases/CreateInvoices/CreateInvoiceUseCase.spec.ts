import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateCustomerDTO } from "../../../customers/dtos/CreateCustomerDTO";
import { CreateCustomerUseCase } from "../../../customers/useCases/createCustomer/CreateCustomerUseCase";
import { CreateUserDTO } from "../../../users/dtos/CreateUserDTO";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreateInvoiceDTO } from "../../dtos/CreateInvoiceDTO";
import { CreateInvoiceUseCase } from "./CreateInvoiceUseCase";

describe("Create Invoice Use Case", () => {
  let createUserUseCase: CreateUserUseCase;
  let createCustomerUseCase: CreateCustomerUseCase;
  let createInvoiceUseCase: CreateInvoiceUseCase;

  beforeAll(() => {
    createUserUseCase = new CreateUserUseCase();
    createCustomerUseCase = new CreateCustomerUseCase();
    createInvoiceUseCase = new CreateInvoiceUseCase();
  });

  it("should be able to create a new invoice", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testcreateinvoice@example.com",
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
      email: "testcreatecustomer@example.com",
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

    expect(invoice).toHaveProperty("id");
  });

  it("should not be able to create a new invoice if user don't exists", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testcreateinvoice1@example.com",
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
      email: "testcreatecustomer@example.com",
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
      userId: "user.id",
      customerId: customer.id,
    };

    await expect(createInvoiceUseCase.execute(invoiceData)).rejects.toEqual(
      new AppError("User not found!")
    );
  });

  it("should not be able to create a new invoice if customer don't exists", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testcreateinvoice2@example.com",
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
      email: "testcreatecustomer@example.com",
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
      customerId: "customer.id",
    };

    await expect(createInvoiceUseCase.execute(invoiceData)).rejects.toEqual(
      new AppError("Customer not found!")
    );
  });

  afterAll(async () => {
    const usersToDelete = [
      "testcreateinvoice@example.com",
      "testcreateinvoice1@example.com",
      "testcreateinvoice2@example.com",
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

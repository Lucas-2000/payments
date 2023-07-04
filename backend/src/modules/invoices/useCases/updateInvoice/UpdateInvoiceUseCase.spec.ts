import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../error/AppError";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreateUserDTO } from "../../../users/dtos/CreateUserDTO";
import { UpdateInvoiceUseCase } from "./UpdateInvoiceUseCase";
import { CreateCustomerUseCase } from "../../../customers/useCases/createCustomer/CreateCustomerUseCase";
import { CreateCustomerDTO } from "../../../customers/dtos/CreateCustomerDTO";
import { CreateInvoiceUseCase } from "../createInvoices/CreateInvoiceUseCase";
import { CreateInvoiceDTO } from "../../dtos/CreateInvoiceDTO";
import { UpdateInvoiceDTO } from "../../dtos/UpdateInvoiceDTO";

describe("Update Invoice Use Case", () => {
  let updateInvoiceUseCase: UpdateInvoiceUseCase;
  let createUserUseCase: CreateUserUseCase;
  let createCustomerUseCase: CreateCustomerUseCase;
  let createInvoiceUseCase: CreateInvoiceUseCase;

  beforeAll(async () => {
    updateInvoiceUseCase = new UpdateInvoiceUseCase();
    createUserUseCase = new CreateUserUseCase();
    createCustomerUseCase = new CreateCustomerUseCase();
    createInvoiceUseCase = new CreateInvoiceUseCase();
  });

  it("should be able to update the invoice", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testuserupdateinvoice@example.com",
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

    const invoiceToUpdate: UpdateInvoiceDTO = {
      id: invoice.id,
      description: "Test Invoice Update",
      value: 1,
      payment_method: "PIX",
      due_date: "2023-09-01",
      is_paid: false,
    };

    const invoiceUpdated = await updateInvoiceUseCase.execute(invoiceToUpdate);

    expect(invoiceUpdated).toHaveProperty("id");
  });

  it("should not be able to update the invoice if invoice not found", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testuserupdateinvoice1@example.com",
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

    const invoiceToUpdate: UpdateInvoiceDTO = {
      id: "invoice.id",
      description: "Test Invoice Update",
      value: 1,
      payment_method: "PIX",
      due_date: "2023-09-01",
      is_paid: false,
    };

    await expect(updateInvoiceUseCase.execute(invoiceToUpdate)).rejects.toEqual(
      new AppError("Invoice not found!")
    );
  });

  afterAll(async () => {
    const usersToDelete = [
      "testuserupdateinvoice@example.com",
      "testuserupdateinvoice1@example.com",
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

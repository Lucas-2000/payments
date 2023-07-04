import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../error/AppError";
import { CreateUserDTO } from "../../../users/dtos/CreateUserDTO";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { GetCustomerByIdUseCase } from "../../../customers/useCases/getCustomerById/GetCustomerByIdUseCase";
import { CreateCustomerUseCase } from "../../../customers/useCases/createCustomer/CreateCustomerUseCase";
import { GetInvoicesByIdDTO } from "../../dtos/GetInvoicesByIdDTO";
import { CreateCustomerDTO } from "../../../customers/dtos/CreateCustomerDTO";
import { CreateInvoiceUseCase } from "../createInvoices/CreateInvoiceUseCase";
import { CreateInvoiceDTO } from "../../dtos/CreateInvoiceDTO";
import { GetInvoicesByIdUseCase } from "./GetInvoicesByIdUseCase";

describe("Get Customer by id Use Case", () => {
  let getInvoiceByIdUseCase: GetInvoicesByIdUseCase;
  let createUserUseCase: CreateUserUseCase;
  let createCustomerUseCase: CreateCustomerUseCase;
  let createInvoiceUseCase: CreateInvoiceUseCase;
  let invoice: GetInvoicesByIdDTO = {
    id: "",
  };

  beforeAll(async () => {
    getInvoiceByIdUseCase = new GetInvoicesByIdUseCase();
    createUserUseCase = new CreateUserUseCase();
    createCustomerUseCase = new CreateCustomerUseCase();
    createInvoiceUseCase = new CreateInvoiceUseCase();

    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testgetinvoicebyid@example.com",
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
      email: "testgetcustomerbyid@example.com",
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

    invoice = await createInvoiceUseCase.execute(invoiceData);
  });

  it("should be able to get the invoice by id", async () => {
    const invoiceData: GetInvoicesByIdDTO = {
      id: invoice.id,
    };

    const getInvoice = await getInvoiceByIdUseCase.execute(invoiceData);

    expect(getInvoice).length > 0;
  });

  it("should not be able to get the invoice by id if invoice don't exists", async () => {
    const invoiceData: GetInvoicesByIdDTO = {
      id: "invoice.id",
    };

    await expect(getInvoiceByIdUseCase.execute(invoiceData)).rejects.toEqual(
      new AppError("Invoice not found!")
    );
  });

  afterAll(async () => {
    const usersToDelete = ["testgetinvoicebyid@example.com"];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});

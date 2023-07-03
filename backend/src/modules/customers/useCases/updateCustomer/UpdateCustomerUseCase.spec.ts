import { UpdateCustomerDTO } from "./../../dtos/UpdateCustomerDTO";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../error/AppError";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreateUserDTO } from "../../../users/dtos/CreateUserDTO";

describe("Update Customer Use Case", () => {
  let updateCustomerUseCase: UpdateCustomerUseCase;
  let createUserUseCase: CreateUserUseCase;

  beforeAll(async () => {
    updateCustomerUseCase = new UpdateCustomerUseCase();
    createUserUseCase = new CreateUserUseCase();
  });

  it("should be able to update the customer", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testuserupdatecustomer@example.com",
      password: "test123",
    };

    const user = await createUserUseCase.execute(userData);

    const customer = await prisma.customers.create({
      data: {
        first_name: "John",
        last_name: "Doe",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testupdatecustomer@example.com",
        phone: "11911111111",
        userId: user.id,
      },
    });

    const customerDataToUpdate: UpdateCustomerDTO = {
      id: customer.id,
      first_name: "John",
      last_name: "Doe Updated",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testupdatecustomer@example.com",
      phone: "11911111111",
    };

    const customerUpdated = await updateCustomerUseCase.execute(
      customerDataToUpdate
    );

    expect(customerUpdated).toHaveProperty("id");
  });

  it("should not be able to update the customer if customer is not found", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testuserupdatecustomer1@example.com",
      password: "test123",
    };

    const user = await createUserUseCase.execute(userData);

    await prisma.customers.create({
      data: {
        first_name: "John",
        last_name: "Doe",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testupdatecustomer1@example.com",
        phone: "11911111111",
        userId: user.id,
      },
    });

    const customerDataToUpdate: UpdateCustomerDTO = {
      id: "customer.id",
      first_name: "John",
      last_name: "Doe Updated",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testupdatecustomer1@example.com",
      phone: "11911111111",
    };

    await expect(
      updateCustomerUseCase.execute(customerDataToUpdate)
    ).rejects.toEqual(new AppError("Customer not found!"));
  });

  afterAll(async () => {
    const usersToDelete = [
      "testuserupdatecustomer@example.com",
      "testupdatecustomer@example.com",
      "testuserupdatecustomer1@example.com",
      "testupdatecustomer1@example.com",
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

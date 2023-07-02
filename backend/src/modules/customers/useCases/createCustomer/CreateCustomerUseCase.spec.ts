import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../../users/dtos/CreateUserDTO";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreateCustomerDTO } from "../../dtos/CreateCustomerDTO";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

describe("Create Customer Use Case", () => {
  let createUserUseCase: CreateUserUseCase;
  let createCustomerUseCase: CreateCustomerUseCase;

  beforeAll(() => {
    createUserUseCase = new CreateUserUseCase();
    createCustomerUseCase = new CreateCustomerUseCase();
  });

  it("should be able to create a new customer", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testusercustomer@example.com",
      password: "test123",
    };

    const user = await createUserUseCase.execute(userData);

    const customer = await createCustomerUseCase.execute({
      first_name: "John",
      last_name: "Doe",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testcreatecustomer@example.com",
      phone: "11911111111",
      userId: user.id,
    });

    expect(customer).toHaveProperty("id");
  });

  it("should not be able to create a new customer if user don't exists", async () => {
    const customer: CreateCustomerDTO = {
      first_name: "John",
      last_name: "Doe",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testcreatecustomer2@example.com",
      phone: "11911111111",
      userId: "user.id",
    };

    await expect(createCustomerUseCase.execute(customer)).rejects.toEqual(
      new AppError("User not exists!")
    );
  });

  afterAll(async () => {
    const usersToDelete = [
      "testusercustomer@example.com",
      "testcreatecustomer@example.com",
      "testcreatecustomer2@example.com",
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

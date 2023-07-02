import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../error/AppError";
import { GetCustomerByIdUseCase } from "./GetCustomerByIdUseCase";
import { GetCustomerByIdDTO } from "../../dtos/GetCustomerByIdDTO";
import { CreateUserDTO } from "../../../users/dtos/CreateUserDTO";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";

describe("Get Customer by id Use Case", () => {
  let getCustomerByIdUseCase: GetCustomerByIdUseCase;
  let createUserUseCase: CreateUserUseCase;
  let customer: GetCustomerByIdDTO = {
    id: "",
  };

  beforeAll(async () => {
    getCustomerByIdUseCase = new GetCustomerByIdUseCase();
    createUserUseCase = new CreateUserUseCase();

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

    customer = await prisma.customers.create({
      data: {
        first_name: "John",
        last_name: "Doe",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testgetcustomerbyid@example.com",
        phone: "11911111111",
        userId: user.id,
      },
    });
  });

  it("should be able to get the customer by id", async () => {
    const userData: GetCustomerByIdDTO = {
      id: customer.id,
    };

    const user = await getCustomerByIdUseCase.execute(userData);

    expect(user).length > 0;
  });

  it("should not be able to get the customer by id if customer don't exists", async () => {
    const userData: GetCustomerByIdDTO = {
      id: "customer.id",
    };

    await expect(getCustomerByIdUseCase.execute(userData)).rejects.toEqual(
      new AppError("Customer not found!")
    );
  });

  afterAll(async () => {
    const usersToDelete = [
      "testusercustomer@example.com",
      "testgetcustomerbyid@example.com",
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

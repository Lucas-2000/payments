import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../error/AppError";
import { DeleteCustomerUseCase } from "./DeleteCustomerUseCase";
import { DeleteCustomerDTO } from "../../dtos/DeleteCustomerDTO";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";

describe("Update User Use Case", () => {
  let deleteCustomerUseCase: DeleteCustomerUseCase;
  let createUserUseCase: CreateUserUseCase;

  beforeAll(async () => {
    deleteCustomerUseCase = new DeleteCustomerUseCase();
    createUserUseCase = new CreateUserUseCase();
  });

  it("should be able to delete the customer", async () => {
    const userData = await prisma.user.create({
      data: {
        first_name: "John",
        last_name: "Doe",
        birth_date: "2000-01-01",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testdeleteusercustomer@example.com",
        password: "test123",
      },
    });

    const customerData = await prisma.customers.create({
      data: {
        first_name: "John",
        last_name: "Doe",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testdeletecustomer@example.com",
        phone: "11911111111",
        userId: userData.id,
      },
    });

    const customerId: DeleteCustomerDTO = {
      id: customerData.id,
    };

    const customerDeleted = await deleteCustomerUseCase.execute(customerId);

    expect(customerDeleted).toHaveProperty("id");
  });

  it("should not be able to delete the customer if customer not found", async () => {
    const userData = await prisma.user.create({
      data: {
        first_name: "John",
        last_name: "Doe",
        birth_date: "2000-01-01",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testdeleteusercustomer1@example.com",
        password: "test123",
      },
    });

    await prisma.customers.create({
      data: {
        first_name: "John",
        last_name: "Doe",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testdeletecustomer@example.com",
        phone: "11911111111",
        userId: userData.id,
      },
    });

    const customerId: DeleteCustomerDTO = {
      id: "customerData.id",
    };

    await expect(deleteCustomerUseCase.execute(customerId)).rejects.toEqual(
      new AppError("Customer not found!")
    );
  });

  afterAll(async () => {
    const usersToDelete = [
      "testdeleteusercustomer@example.com",
      "testdeleteusercustomer1@example.com",
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

import { CreateUserUseCase } from "./CreateUserUseCase";
import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { AppError } from "../../../../error/AppError";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { prisma } from "../../../../prisma/client";

describe("Create User", () => {
  let createUserUseCase: CreateUserUseCase;

  beforeAll(() => {
    createUserUseCase = new CreateUserUseCase();
  });

  it("should be able to create a new user", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "test@example.com",
      password: "test123",
    };

    const user = await createUserUseCase.execute(userData);

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a user if email already exists", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Existing Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testexisting@example.com",
      password: "test123",
    };

    await createUserUseCase.execute(userData);

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
      new AppError("User already exists!")
    );
  });

  afterAll(async () => {
    const usersToDelete = ["testexisting@example.com", "test@example.com"];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});

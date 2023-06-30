import { GenerateTokenProvider } from "./../../../../provider/GenerateTokenProvider";
import { CreateUserUseCase } from "./../createUser/CreateUserUseCase";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "../../../../prisma/client";
import { AuthUserDTO } from "../../dtos/AuthUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { AppError } from "../../../../error/AppError";

describe("Authenticate User Use Case", () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let generateTokenProvider: GenerateTokenProvider;

  beforeAll(async () => {
    authenticateUserUseCase = new AuthenticateUserUseCase();
    createUserUseCase = new CreateUserUseCase();
    generateTokenProvider = new GenerateTokenProvider();
  });

  it("should be able to auth user", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testauth@example.com",
      password: "test123",
    };

    await createUserUseCase.execute(userData);

    const userDataAuth: AuthUserDTO = {
      email: "testauth@example.com",
      password: "test123",
    };

    const userAuth = await authenticateUserUseCase.execute(userDataAuth);

    expect(userAuth).toHaveProperty("token");
    expect(userAuth).toHaveProperty("refreshToken");
  });

  it("should not be able to auth user if email or password is incorret", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testauth1@example.com",
      password: "test123",
    };

    await createUserUseCase.execute(userData);

    const userDataAuth: AuthUserDTO = {
      email: "testauth12@example.com",
      password: "test1234",
    };

    await expect(authenticateUserUseCase.execute(userDataAuth)).rejects.toEqual(
      new AppError("User or password incorrect!")
    );
  });

  afterAll(async () => {
    const usersToDelete = ["testauth@example.com", "testauth1@example.com"];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});

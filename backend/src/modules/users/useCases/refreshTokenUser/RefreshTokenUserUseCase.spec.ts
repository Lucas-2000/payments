import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import { AuthUserDTO } from "../../dtos/AuthUserDTO";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

describe("Refresh Token User Use Case", () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let refreshTokenUserUseCase: RefreshTokenUserUseCase;

  beforeAll(() => {
    authenticateUserUseCase = new AuthenticateUserUseCase();
    createUserUseCase = new CreateUserUseCase();
    refreshTokenUserUseCase = new RefreshTokenUserUseCase();
  });

  it("should be able to get the refresh token", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testrefreshtoken@example.com",
      password: "test123",
    };

    await createUserUseCase.execute(userData);

    const userDataAuth: AuthUserDTO = {
      email: "testrefreshtoken@example.com",
      password: "test123",
    };

    const userAuth = await authenticateUserUseCase.execute(userDataAuth);

    const refreshToken = await refreshTokenUserUseCase.execute(
      userAuth.refreshToken.id
    );

    expect(refreshToken).toHaveProperty("token");
  });

  it("should not be able to get the refresh token if the refresh token is invalid", async () => {
    const userData: CreateUserDTO = {
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testrefreshtoken2@example.com",
      password: "test123",
    };

    await createUserUseCase.execute(userData);

    const userDataAuth: AuthUserDTO = {
      email: "testrefreshtoken2@example.com",
      password: "test123",
    };

    const userAuth = await authenticateUserUseCase.execute(userDataAuth);

    await expect(
      refreshTokenUserUseCase.execute(userAuth.refreshToken.userId)
    ).rejects.toEqual(new AppError("Invalid Refresh Token!"));
  });

  afterAll(async () => {
    const usersToDelete = [
      "testrefreshtoken@example.com",
      "testerefreshtoken2@example.com",
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

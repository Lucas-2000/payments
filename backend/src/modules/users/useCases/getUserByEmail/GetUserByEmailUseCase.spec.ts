import { GetUserByEmailDTO } from "./../../dtos/GetUserByEmailDTO";
import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { GetUserByEmailUseCase } from "./GetUserByEmailUseCase";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../error/AppError";

describe("Get Users by email Use Case", () => {
  let getUserByEmailUseCase: GetUserByEmailUseCase;

  beforeAll(async () => {
    getUserByEmailUseCase = new GetUserByEmailUseCase();

    await prisma.user.create({
      data: {
        first_name: "John",
        last_name: "Doe",
        birth_date: "2000-01-01",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "test@example.com",
        password: "test123",
      },
    });
  });

  it("should be able to get the user by email", async () => {
    const userData: GetUserByEmailDTO = {
      email: "test@example.com",
    };

    const user = await getUserByEmailUseCase.execute(userData);

    expect(user).length > 0;
  });

  it("should not be able to get the user by email if email don't exists", async () => {
    const userData: GetUserByEmailDTO = {
      email: "testing@example.com",
    };

    await expect(getUserByEmailUseCase.execute(userData)).rejects.toEqual(
      new AppError("User not exists!")
    );
  });

  afterAll(async () => {
    const usersToDelete = ["test@example.com"];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});

import { UpdateUserDTO } from "./../../dtos/UpdateUserDTO";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../error/AppError";

describe("Update User Use Case", () => {
  let updateUserUseCase: UpdateUserUseCase;

  beforeAll(async () => {
    updateUserUseCase = new UpdateUserUseCase();

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

  it("should be able to update the user", async () => {
    const userData: UpdateUserDTO = {
      first_name: "John",
      last_name: "Doe Updated",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "test@example.com",
      password: "test123",
    };

    const user = await updateUserUseCase.execute(userData);

    expect(user).toHaveProperty("id");
  });

  it("should not be able to update the user if email is invalid", async () => {
    const userData: UpdateUserDTO = {
      first_name: "John",
      last_name: "Doe Updated",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "test1@example.com",
      password: "test123",
    };

    await expect(updateUserUseCase.execute(userData)).rejects.toEqual(
      new AppError("User not exists!")
    );
  });

  afterAll(async () => {
    const usersToDelete = ["test@example.com", "test1@example.com"];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});

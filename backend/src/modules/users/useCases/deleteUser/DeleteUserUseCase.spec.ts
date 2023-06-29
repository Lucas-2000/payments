import { DeleteUserDTO } from "./../../dtos/DeleteUserDTO";
import { beforeAll, describe, expect, it } from "vitest";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../error/AppError";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

describe("Update User Use Case", () => {
  let deleteUserUseCase: DeleteUserUseCase;

  beforeAll(async () => {
    deleteUserUseCase = new DeleteUserUseCase();

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

  it("should be able to delete the user", async () => {
    const userData: DeleteUserDTO = {
      email: "test@example.com",
    };

    const user = await deleteUserUseCase.execute(userData);

    expect(user).toHaveProperty("id");
  });

  it("should not be able to delete the user if email is invalid", async () => {
    const userData: DeleteUserDTO = {
      email: "test1@example.com",
    };

    await expect(deleteUserUseCase.execute(userData)).rejects.toEqual(
      new AppError("User not exists!")
    );
  });
});

import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";
import { prisma } from "../../../../prisma/client";

describe("Get User by email controller", () => {
  beforeAll(async () => {
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
    const response = await request(app).get("/users/test@example.com");

    expect(response.status).toBe(201);
  });

  it("should not be able to get the user by email if email don't exists", async () => {
    const response = await request(app).get("/users/testing@example.com");

    expect(response.status).toBe(500);
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

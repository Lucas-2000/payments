import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";
import { prisma } from "../../../../prisma/client";

describe("Refresh Token User Controller", () => {
  beforeAll(async () => {
    await request(app).post("/users").send({
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testrefreshtokencontroller@example.com",
      password: "test123",
    });
  });

  it("should be able to get refresh token for the user", async () => {
    const token = await request(app).post("/users/login").send({
      email: "testrefreshtokencontroller@example.com",
      password: "test123",
    });

    const response = await request(app).post("/users/refresh-token").send({
      refresh_token: token.body.refreshToken.id,
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to get refresh token if the refresh token is invalid", async () => {
    const token = await request(app).post("/users/login").send({
      email: "testrefreshtokencontroller@example.com",
      password: "test123",
    });

    const response = await request(app).post("/users/refresh-token").send({
      refresh_token: token.body.refreshToken.userId,
    });

    expect(response.status).toBe(500);
  });

  afterAll(async () => {
    const usersToDelete = ["testrefreshtokencontroller@example.com"];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});

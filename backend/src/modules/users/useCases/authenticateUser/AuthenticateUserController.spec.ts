import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";
import { prisma } from "../../../../prisma/client";

describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    await request(app).post("/users").send({
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testauthcontroller@example.com",
      password: "test123",
    });
  });

  it("should be able to auth a user", async () => {
    const req = await request(app).post("/users/login").send({
      email: "testauthcontroller@example.com",
      password: "test123",
    });

    const response = await request(app).post("/users/login").send({
      email: "testauthcontroller@example.com",
      password: "test123",
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to auth a user if email or password is invalid", async () => {
    const req = await request(app).post("/users/login").send({
      email: "testauthcontroller1@example.com",
      password: "test123",
    });

    const response = await request(app).post("/users/login").send({
      email: "testauthcontroller1@example.com",
      password: "test1234",
    });

    expect(response.status).toBe(500);
  });

  afterAll(async () => {
    const usersToDelete = [
      "testauthcontroller@example.com",
      "testauthcontroller1@example.com",
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

import { afterAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../../app";
import { prisma } from "../../../../prisma/client";

describe("Create User Controller", () => {
  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      first_name: "Test",
      last_name: "Integration",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testintegration@example.com",
      password: "test123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should not be able to create a user if email already exists", async () => {
    await request(app).post("/users").send({
      first_name: "Test",
      last_name: "Integration Exist",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testintegrationexist@example.com",
      password: "test123",
    });

    const response = await request(app).post("/users").send({
      first_name: "Test",
      last_name: "Integration Exist",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testintegrationexist@example.com",
      password: "test123",
    });

    expect(response.status).toBe(500);
  });

  afterAll(async () => {
    const usersToDelete = [
      "testintegration@example.com",
      "testintegrationexist@example.com",
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

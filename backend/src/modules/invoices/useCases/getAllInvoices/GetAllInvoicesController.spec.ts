import request from "supertest";
import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { app } from "../../../../app";
import { prisma } from "../../../../prisma/client";

describe("Get All Users Invoices", () => {
  beforeAll(async () => {
    await request(app).post("/users").send({
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testintegrationgetallinvoices@example.com",
      password: "test123",
    });
  });

  it("should be able to get all invoices", async () => {
    const req = await request(app).post("/users/login").send({
      email: "testintegrationgetallinvoices@example.com",
      password: "test123",
    });

    const response = await request(app)
      .get("/invoices")
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    const usersToDelete = ["testintegrationgetallinvoices@example.com"];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});

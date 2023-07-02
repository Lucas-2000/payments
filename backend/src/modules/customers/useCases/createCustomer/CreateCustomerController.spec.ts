import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../../app";
import { prisma } from "../../../../prisma/client";

describe("Create Customer Controller", () => {
  beforeAll(async () => {
    await request(app).post("/users").send({
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testintegrationcustomeruser@example.com",
      password: "test123",
    });
  });

  it("should be able to create a new customer", async () => {
    const user = await request(app).get(
      "/users/testintegrationcustomeruser@example.com"
    );

    const req = await request(app).post("/users/login").send({
      email: "testintegrationcustomeruser@example.com",
      password: "test123",
    });

    const response = await request(app)
      .post("/customers")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        first_name: "John",
        last_name: "Doe",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testintegrationcustomeruser@example.com",
        phone: "11911111111",
        userId: user.body.id,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should not be able to create a new customer if user don't exists", async () => {
    const user = await request(app).get(
      "/users/testintegrationcustomeruser@example.com"
    );

    const req = await request(app).post("/users/login").send({
      email: "testintegrationcustomeruser@example.com",
      password: "test123",
    });

    const response = await request(app)
      .post("/customers")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        first_name: "John",
        last_name: "Doe",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testintegrationcustomeruser@example.com",
        phone: "11911111111",
        userId: user.body.email,
      });

    expect(response.status).toBe(500);
  });

  afterAll(async () => {
    const usersToDelete = ["testintegrationcustomeruser@example.com"];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});

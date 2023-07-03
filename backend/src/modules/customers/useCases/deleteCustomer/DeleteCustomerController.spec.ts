import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";
import { prisma } from "../../../../prisma/client";

describe("Delete Customer Controller", () => {
  beforeAll(async () => {
    await request(app).post("/users").send({
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testintegrationdeletecustomeruser@example.com",
      password: "test123",
    });
  });

  it("should be able to delete customer", async () => {
    const user = await request(app).get(
      "/users/testintegrationdeletecustomeruser@example.com"
    );

    const req = await request(app).post("/users/login").send({
      email: "testintegrationdeletecustomeruser@example.com",
      password: "test123",
    });

    const customer = await request(app)
      .post(`/customers/`)
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        first_name: "John",
        last_name: "Doe",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testintegrationdeletecustomer@example.com",
        phone: "11911111111",
        userId: user.body.id,
      });

    const response = await request(app)
      .delete(`/customers/${customer.body.id}`)
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        first_name: "John",
        last_name: "Doe",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testintegrationdeletecustomer@example.com",
        phone: "11911111111",
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to delete customer if customer not found", async () => {
    const user = await request(app).get(
      "/users/testintegrationupdatecustomeruser@example.com"
    );

    const req = await request(app).post("/users/login").send({
      email: "testintegrationupdatecustomeruser@example.com",
      password: "test123",
    });

    await request(app)
      .post(`/customers/`)
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        first_name: "John",
        last_name: "Doe",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testintegrationdeletecustomer@example.com",
        phone: "11911111111",
        userId: user.body.id,
      });

    const response = await request(app)
      .delete(`/customers/{customer.body.id}`)
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        first_name: "John",
        last_name: "Doe",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testintegrationdeletecustomer@example.com",
        phone: "11911111111",
      });

    expect(response.status).toBe(500);
  });

  afterAll(async () => {
    const usersToDelete = ["testintegrationdeletecustomeruser@example.com"];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});

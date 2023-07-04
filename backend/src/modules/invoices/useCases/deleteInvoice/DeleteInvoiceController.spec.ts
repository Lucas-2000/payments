import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";
import { prisma } from "../../../../prisma/client";

describe("Delete Invoice Controller", () => {
  beforeAll(async () => {
    await request(app).post("/users").send({
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testintegrationdeleteinvoice@example.com",
      password: "test123",
    });
  });

  it("should be able to delete invoices", async () => {
    const user = await request(app).get(
      "/users/testintegrationdeleteinvoice@example.com"
    );

    const req = await request(app).post("/users/login").send({
      email: "testintegrationdeleteinvoice@example.com",
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

    const invoice = await request(app)
      .post("/invoices")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        description: "Test Invoice",
        value: 1,
        payment_method: "PIX",
        due_date: "2023-09-01",
        is_paid: false,
        userId: user.body.id,
        customerId: customer.body.id,
      });

    const response = await request(app)
      .delete(`/invoices/${invoice.body.id}`)
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(201);
  });

  it("should not be able to delete invoices if invoice not found", async () => {
    const user = await request(app).get(
      "/users/testintegrationdeleteinvoice@example.com"
    );

    const req = await request(app).post("/users/login").send({
      email: "testintegrationdeleteinvoice@example.com",
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

    const invoice = await request(app)
      .post("/invoices")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        description: "Test Invoice",
        value: 1,
        payment_method: "PIX",
        due_date: "2023-09-01",
        is_paid: false,
        userId: user.body.id,
        customerId: customer.body.id,
      });

    const response = await request(app)
      .delete(`/invoices/${"invoice.body.id"}`)
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(500);
  });

  afterAll(async () => {
    const usersToDelete = ["testintegrationdeleteinvoice@example.com"];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});

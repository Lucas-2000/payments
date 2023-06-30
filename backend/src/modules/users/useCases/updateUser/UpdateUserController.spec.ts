import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../../app";
import { prisma } from "../../../../prisma/client";

describe("Update User Controller", () => {
  beforeAll(async () => {
    await request(app).post("/users").send({
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testupdate@example.com",
      password: "test123",
    });
  });

  it("should be able to update a user", async () => {
    const req = await request(app).post("/users/login").send({
      email: "testupdate@example.com",
      password: "test123",
    });

    const response = await request(app)
      .put("/users/testupdate@example.com")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        first_name: "John",
        last_name: "Doe test",
        birth_date: "2000-01-01",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testupdate@example.com",
        password: "test123",
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to update a user if email don't exists", async () => {
    const req = await request(app).post("/users/login").send({
      email: "testupdate@example.com",
      password: "test123",
    });

    const response = await request(app)
      .put("/users/testupdate1@example.com")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        first_name: "John",
        last_name: "Doe",
        birth_date: "2000-01-01",
        cep: "09874123",
        address: "Street Test",
        city: "São Paulo",
        uf: "SP",
        email: "testupdate1@example.com",
        password: "test123",
      });

    expect(response.status).toBe(500);
  });

  afterAll(async () => {
    const usersToDelete = ["testupdate@example.com", "testupdate1@example.com"];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});

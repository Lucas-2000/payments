import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../../app";

describe("Delete User Controller", () => {
  beforeAll(async () => {
    await request(app).post("/users").send({
      first_name: "John",
      last_name: "Doe",
      birth_date: "2000-01-01",
      cep: "09874123",
      address: "Street Test",
      city: "São Paulo",
      uf: "SP",
      email: "testdelete@example.com",
      password: "test123",
    });
  });

  it("should be able to delete a user", async () => {
    const req = await request(app).post("/users/login").send({
      email: "testdelete@example.com",
      password: "test123",
    });

    const response = await request(app)
      .delete("/users/testdelete@example.com")
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(201);
  });

  it("should not be able to delete a user if email don't exists", async () => {
    const req = await request(app).post("/users/login").send({
      email: "testdelete@example.com",
      password: "test123",
    });

    const response = await request(app)
      .delete("/users/testdelete1@example.com")
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(500);
  });
});

import request from "supertest";
import { expect, it, describe } from "vitest";
import { app } from "../../../../app";

describe("Get All Users Controller", () => {
  it("should be able to get all users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(201);
  });
});

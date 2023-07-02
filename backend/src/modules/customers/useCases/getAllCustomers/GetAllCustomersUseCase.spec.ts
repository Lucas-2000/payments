import { expect, it, describe, beforeAll } from "vitest";
import { GetAllCustomersUseCase } from "./GetAllCustomersUseCase";

describe("Get All Customers Use Case", () => {
  let getAllCustomersUseCase: GetAllCustomersUseCase;

  beforeAll(() => {
    getAllCustomersUseCase = new GetAllCustomersUseCase();
  });

  it("should be able to get all customers", async () => {
    const user = await getAllCustomersUseCase.execute();

    expect(user).length > 0;
  });
});

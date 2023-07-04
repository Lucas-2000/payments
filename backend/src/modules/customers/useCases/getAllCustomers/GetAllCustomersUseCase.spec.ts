import { expect, it, describe, beforeAll } from "vitest";
import { GetAllCustomersUseCase } from "./GetAllCustomersUseCase";

describe("Get All Customers Use Case", () => {
  let getAllCustomersUseCase: GetAllCustomersUseCase;

  beforeAll(() => {
    getAllCustomersUseCase = new GetAllCustomersUseCase();
  });

  it("should be able to get all customers", async () => {
    const customer = await getAllCustomersUseCase.execute();

    expect(customer).length > 0;
  });
});

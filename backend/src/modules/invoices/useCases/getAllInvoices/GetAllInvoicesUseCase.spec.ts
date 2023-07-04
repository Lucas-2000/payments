import { expect, it, describe, beforeAll } from "vitest";
import { GetAllInvoicesUseCase } from "./GetAllInvoicesUseCase";

describe("Get All Invoices Use Case", () => {
  let getAllInvoicesUseCase: GetAllInvoicesUseCase;

  beforeAll(() => {
    getAllInvoicesUseCase = new GetAllInvoicesUseCase();
  });

  it("should be able to get all invoices", async () => {
    const invoices = await getAllInvoicesUseCase.execute();

    expect(invoices).length > 0;
  });
});

import { GetAllUsersUseCase } from "./GetAllUsersUseCase";
import { expect, it, describe, beforeAll } from "vitest";

describe("Get All Users Use Case", () => {
  let getAllUsersUseCase: GetAllUsersUseCase;

  beforeAll(() => {
    getAllUsersUseCase = new GetAllUsersUseCase();
  });

  it("should be able to get all users", async () => {
    const user = await getAllUsersUseCase.execute();

    expect(user).length > 0;
  });
});

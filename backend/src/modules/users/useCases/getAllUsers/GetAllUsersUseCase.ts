import { prisma } from "../../../../prisma/client";
import { User } from "@prisma/client";
import { AppError } from "../../../../error/AppError";

export class GetAllUsersUseCase {
  async execute(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }
}

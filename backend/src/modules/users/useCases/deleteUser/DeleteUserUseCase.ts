import { prisma } from "../../../../prisma/client";
import { User } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { DeleteUserDTO } from "../../dtos/DeleteUserDTO";

export class DeleteUserUseCase {
  async execute({ email }: DeleteUserDTO): Promise<User> {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!email) {
      throw new AppError("Email don't exists!");
    }

    if (!userExists) {
      throw new AppError("User not exists!");
    }

    const user = await prisma.user.delete({
      where: { email },
    });

    return user;
  }
}

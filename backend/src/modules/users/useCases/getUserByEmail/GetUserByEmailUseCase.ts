import { prisma } from "../../../../prisma/client";
import { User } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { GetUserByEmailDTO } from "../../dtos/GetUserByEmailDTO";

export class GetUserByEmailUseCase {
  async execute({ email }: GetUserByEmailDTO): Promise<User> {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      throw new AppError("User not exists!");
    }

    return userExists;
  }
}

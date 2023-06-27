import bcrypt from "bcrypt";
import { prisma } from "../../../../prisma/client";
import { User } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { UpdateUserDTO } from "../../dtos/UpdateUserDTO";

export class UpdateUserUseCase {
  async execute({
    first_name,
    last_name,
    birth_date,
    cep,
    address,
    city,
    uf,
    email,
    password,
  }: UpdateUserDTO): Promise<User> {
    if (!email) {
      throw new AppError("Insert a email");
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      throw new AppError("User not exists!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await prisma.user.update({
      where: { email },
      data: {
        first_name,
        last_name,
        birth_date,
        cep,
        address,
        city,
        uf,
        password: hash,
      },
    });

    return user;
  }
}

import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { prisma } from "../../../../prisma/client";
import { User } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import bcrypt from "bcrypt";

export class CreateUserUseCase {
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
  }: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        birth_date,
        cep,
        address,
        city,
        uf,
        email,
        password: hash,
      },
    });

    return user;
  }
}

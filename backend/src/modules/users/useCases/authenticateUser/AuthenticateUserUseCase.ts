import { GenerateTokenProvider } from "./../../../../provider/GenerateTokenProvider";
import { GenerateRefreshTokenProvider } from "../../../../provider/GenerateRefreshTokenProvider";
import { compare } from "bcrypt";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import { IAuthUser } from "../../dtos/IAuthUser";

export class AuthenticateUserUseCase {
  async execute({ email, password }: IAuthUser) {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new AppError("User or password incorrect!");
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new AppError("User or password incorrect!");
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userExists.id);

    await prisma.refreshToken.deleteMany({
      where: {
        userId: userExists.id,
      },
    });

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefreshTokenProvider.execute(
      userExists.id
    );

    return { token, refreshToken };
  }
}

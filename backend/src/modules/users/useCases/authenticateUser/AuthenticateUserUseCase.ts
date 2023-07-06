import { GenerateTokenProvider } from "./../../../../provider/GenerateTokenProvider";
import { GenerateRefreshTokenProvider } from "../../../../provider/GenerateRefreshTokenProvider";
import { compare } from "bcrypt";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import { AuthUserDTO } from "../../dtos/AuthUserDTO";

export class AuthenticateUserUseCase {
  async execute({ email, password }: AuthUserDTO) {
    if (!email || !password) {
      throw new AppError("Error on auth");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("User or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("User or password incorrect!");
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(user.id);

    await prisma.refreshToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefreshTokenProvider.execute(user.id);

    return { token, refreshToken, user };
  }
}

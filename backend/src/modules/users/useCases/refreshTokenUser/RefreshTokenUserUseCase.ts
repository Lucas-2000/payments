import { GenerateRefreshTokenProvider } from "./../../../../provider/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "./../../../../provider/GenerateTokenProvider";
import { AppError } from "../../../../error/AppError";
import { prisma } from "../../../../prisma/client";
import dayjs from "dayjs";

export class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      throw new AppError("Invalid Refresh Token!");
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    if (refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      });

      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refreshToken.userId
      );

      return { token, newRefreshToken };
    }

    return { token };
  }
}

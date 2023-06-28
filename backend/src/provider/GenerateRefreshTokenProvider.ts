import dayjs from "dayjs";
import { prisma } from "../prisma/client";

export class GenerateRefreshTokenProvider {
  async execute(userId: string) {
    // To make test, change the time to seconds
    const expiresIn = dayjs().add(1, "day").unix();

    const generateRefreshTokenProvider = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generateRefreshTokenProvider;
  }
}

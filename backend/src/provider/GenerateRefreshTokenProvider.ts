import dayjs from "dayjs";
import { prisma } from "../prisma/client";

export class GenerateRefreshTokenProvider {
  async execute(userId: string) {
    // To make test, change the time to seconds
    const expiresIn = dayjs().add(15, "minutes").unix();

    const generateRefreshTokenProvider = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generateRefreshTokenProvider;
  }
}

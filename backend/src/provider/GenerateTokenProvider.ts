import { sign } from "jsonwebtoken";

export class GenerateTokenProvider {
  async execute(userId: string) {
    // To make test, change the time to seconds
    const token = sign({}, "39b2a5ca-4624-4af6-939c-051e6daa9fef", {
      subject: userId,
      expiresIn: "1d",
    });

    return token;
  }
}

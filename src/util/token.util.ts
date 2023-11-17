import jwt from "jsonwebtoken";

export function generateJwToken(payload: Record<string, any>): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

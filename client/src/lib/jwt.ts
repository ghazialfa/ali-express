import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";

const SECRET_KEY = process.env.JWT_SECRET as string;

export const createToken = (payload: JwtPayload) =>
  jwt.sign(payload, SECRET_KEY);

export const verifyToken = (token: string) => jwt.verify(token, SECRET_KEY);

export const PayloadJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const PayloadJose = await jose.jwtVerify<T>(token, secretKey);
  return PayloadJose.payload;
};

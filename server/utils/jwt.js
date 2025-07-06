import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expiresIn = "1d";

export function generateToken(payload) {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, secret);
}

import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "Tokenprueba";
/**
 *
 * @param email
 * @returns
 */
const generateToken = async (email: string, id: string) => {
  const jwt = await sign({ email, id }, JWT_SECRET, { expiresIn: "2h" });
  return jwt;
};
/**
 *
 * @param jwt
 * @returns
 */
const verifyToken = (jwt: string) => {
  const isCorrect = verify(jwt, JWT_SECRET);
  return isCorrect;
};

export { generateToken, verifyToken };

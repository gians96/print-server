import { NextFunction, Request, Response } from "express";
import { RequestExt } from "../interfaces/user.interface";
import { verifyToken } from "../utils/jwt.handle";

const ValidateSession = (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtBearer = req.headers.authorization || "";
    const jwt = jwtBearer.split(" ").pop();
    const isUser = verifyToken(`${jwt}`) as { id: string };
    if (!isUser) return res.status(401).send("JWT_INVALID");
    req.user = isUser;
    next();
  } catch (error) {
    res.status(401).send("SESSION_NO_VALID");
  }
};
export { ValidateSession };

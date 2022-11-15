import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Auth } from "./auth.interface";

export interface User extends Auth {
  name: string;
  description: string;
  age: number
}

export interface RequestExt extends Request {
  user?: { id: string } | JwtPayload;
}

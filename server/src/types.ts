import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { User } from "./entities/User";

export class MyContext {
  req: Request & {
    session: Session &
      Partial<SessionData> & { userId?: number; isAdmin: boolean };
    user?: Express.User & User
  };
  res: Response;
  redis: Redis;
}
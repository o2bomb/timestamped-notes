import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";

export class MyContext {
  req: Request & {
    session: Session &
      Partial<SessionData> & { userId?: number; isAdmin: boolean };
    user?: Express.User & {
      displayName?: string;
    }
  };
  res: Response;
  redis: Redis;
}
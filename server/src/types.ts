import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";

export class MyContext {
  req: Request & {
    session: Session &
      Partial<SessionData> & { userId?: number; isAdmin: boolean };
  };
  res: Response;
  redis: Redis;
}
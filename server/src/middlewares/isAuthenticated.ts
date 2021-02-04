import { AuthenticationError } from "apollo-server-express";
import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.isAuthenticated()) {
    throw new AuthenticationError("User is not authenticated");
  }

  return next();
}
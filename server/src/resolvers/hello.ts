import { MyContext } from "../types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello(
    @Ctx() { req }: MyContext
  ) {
    console.log(req.user);
    if (req.isAuthenticated()) {
      return `Welcome back, ${req.user.displayName}`;
    }
    return "Hello World!";
  }
}
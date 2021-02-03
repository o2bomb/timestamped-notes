import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { User } from "../entities/User";
import { Lecture } from "../entities/Lecture";
import { MyContext } from "../types";

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => [Lecture])
  lectures(@Root() user: User) {
    const creatorId = user.id;
    return Lecture.find({
      where: {
        creatorId,
      },
    });
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.isAuthenticated()) {
      return;
    }
    return User.findOne(req.user.id);
  }
}

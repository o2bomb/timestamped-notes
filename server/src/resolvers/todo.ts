import { Todo } from "../entities/Todo";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TodoResolver {
  @Mutation(() => Todo, { nullable: true })
  addTodo(@Arg("content", () => String) content: string) {
    if (content) {
      return Todo.create({
        content
      }).save()
    }
    return;
  }

  @Query(() => [Todo])
  todos() {
    return Todo.createQueryBuilder().getMany();
  }
}
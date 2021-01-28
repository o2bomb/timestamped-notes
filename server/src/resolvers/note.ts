import { Lecture } from "../entities/Lecture";
import { Note } from "../entities/Note";
import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { isExistsQuery } from "../utils/isExistsQuery";

@Resolver(Note)
export class NoteResolver {
  
}

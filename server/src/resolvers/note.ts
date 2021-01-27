import { Lecture } from "../entities/Lecture";
import { Note } from "../entities/Note";
import { Arg, Int, Mutation, Resolver } from "type-graphql";

@Resolver(Note)
export class NoteResolver {
  @Mutation(() => Note, { nullable: true })
  async createNote(
    @Arg("lectureId", () => Int) lectureId: number,
    @Arg("content", () => String) content: string,
    @Arg("timestamp", () => Int) timestamp: number
  ) {
    const lecture = await Lecture.findOne(lectureId);

    console.log(lecture);

    if (!lecture) {
      return;
    }

    if (content.length === 0 || !timestamp) {
      return;
    }

    const newNote = await Note.create({
      lectureId,
      content,
      timestamp,
    }).save();

    return newNote;
  }
}

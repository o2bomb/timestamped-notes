import { Lecture } from "../entities/Lecture";
import { Note } from "../entities/Note";
import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

@Resolver(Lecture)
export class LectureResolver {
  @FieldResolver(() => [Note])
  notes(@Root() lecture: Lecture) {
    const lectureId = lecture.id;
    return Note.find({
      where: {
        lectureId,
      },
    });
  }

  @Query(() => Lecture, { nullable: true })
  getLecture(
    @Arg("id", () => Int) id: number
  ) {
    return Lecture.findOne(id);
  }

  @Query(() => [Lecture])
  lectures() {
    return Lecture.createQueryBuilder().getMany();
  }

  @Mutation(() => Lecture, { nullable: true })
  createLecture(@Arg("videoUrl", () => String) videoUrl: string) {
    if (videoUrl) {
      return Lecture.create({
        videoUrl,
      }).save();
    }
    return;
  }
}

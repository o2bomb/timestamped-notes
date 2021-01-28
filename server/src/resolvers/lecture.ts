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
import { isExistsQuery } from "../utils/isExistsQuery";

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

  @Mutation(() => Lecture, { nullable: true })
  async addNote(
    @Arg("id", () => Int) id: number,
    @Arg("content", () => String) content: string,
    @Arg("timestamp", () => Int) timestamp: number
  ) {
    const [{ exists }] = await Lecture.query(
       isExistsQuery(
        Lecture.createQueryBuilder()
          .select('*')
          .where(`id = ${id}`)
          .getQuery()
      )
    );

    if (!exists) {
      return;
    }

    if (content.length === 0 || timestamp < 0) {
      return;
    }

    await Note.create({
      lectureId: id,
      content,
      timestamp,
    }).save();

    const udpatedLecture = await Lecture.findOne(id);

    return udpatedLecture;
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

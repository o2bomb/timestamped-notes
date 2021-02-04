import { Lecture } from "../entities/Lecture";
import { Note } from "../entities/Note";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { isExistsQuery } from "../utils/isExistsQuery";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { isAuthenticated } from "../middlewares/isAuthenticated";

@Resolver(Lecture)
export class LectureResolver {
  @FieldResolver(() => User, { nullable: true })
  creator(
    @Root() lecture: Lecture
  ) {
    return User.findOne(lecture.creatorId);
  }

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
  @UseMiddleware(isAuthenticated)
  async addNote(
    @Arg("id", () => Int) id: number,
    @Arg("content", () => String) content: string,
    @Arg("timestamp", () => Int) timestamp: number,
    @Ctx() { req }: MyContext
  ) {
    const [{ exists }] = await Lecture.query(
      isExistsQuery(
        Lecture.createQueryBuilder()
          .select('*')
          .where(`id = ${id} AND "creatorId" = ${req.user!.id}`)
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
  @UseMiddleware(isAuthenticated)
  getLecture(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    return Lecture.findOne({
      where: {
        creatorId: req.user!.id,
        id
      }
    });
  }

  @Query(() => [Lecture])
  lectures() {
    return Lecture.createQueryBuilder().getMany();
  }

  @Mutation(() => Lecture, { nullable: true })
  @UseMiddleware(isAuthenticated)
  createLecture(@Arg("videoUrl", () => String) videoUrl: string,
    @Ctx() { req }: MyContext
  ) {
    if (!videoUrl) {
      return;
    }

    return Lecture.create({
      creatorId: req.user!.id,
      videoUrl,
    }).save();
  }
}

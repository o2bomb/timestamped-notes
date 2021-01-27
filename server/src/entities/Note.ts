import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Lecture } from "./Lecture";

@ObjectType()
@Entity()
export class Note extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  lectureId: number;

  @ManyToOne(() => Lecture, (lecture) => lecture.notes, {
    onDelete: "CASCADE" // delete note when lecture is deleted
  })
  lecture: Lecture;

  @Field()
  @Column()
  content!: string;

  @Field()
  @Column()
  timestamp!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

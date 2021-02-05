import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Note } from "./Note";
import { User } from "./User";

@ObjectType()
@Entity()
export class Lecture extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.lectures)
  creator: User;

  @OneToMany(() => Note, (note) => note.lecture)
  notes: Note[];

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  videoUrl!: string;

  @Field()
  @Column()
  thumbnailUrl!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

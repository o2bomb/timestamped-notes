import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Note } from "./Note";

@ObjectType()
@Entity()
export class Lecture extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToMany(() => Note, (note) => note.lecture)
  notes: Note[];

  @Field()
  @Column()
  videoUrl!: string;
  
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

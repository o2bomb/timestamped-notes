import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;
  
  // @OneToMany(() => Lecture, lecture => lecture.creator)
  // lectures: Lecture[];
  
  @Field()
  @Column()
  githubId: number;

  @Field()
  @Column()
  displayName!: string;

  @Field()
  @Column()
  avatarUrl: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

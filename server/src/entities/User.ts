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
import { Lecture } from "./Lecture";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;
  
  @OneToMany(() => Lecture, lecture => lecture.creator)
  lectures: Lecture[];
  
  @Field({ nullable: true })
  @Column({ nullable: true })
  githubId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  googleId: string;
  
  @Field({ nullable: true })
  @Column({ nullable: true })
  facebookId: string;
  
  @Field({ nullable: true })
  @Column({ nullable: true })
  twitterId: string;

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

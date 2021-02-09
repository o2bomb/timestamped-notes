import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialise1612855411441 implements MigrationInterface {
    name = 'Initialise1612855411441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note" ("id" SERIAL NOT NULL, "lectureId" integer NOT NULL, "content" character varying NOT NULL, "timestamp" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8756b6626b168d33ee33e26cc11" PRIMARY KEY ("id", "lectureId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "githubId" character varying, "googleId" character varying, "facebookId" character varying, "twitterId" character varying, "displayName" character varying NOT NULL, "avatarUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lecture" ("id" SERIAL NOT NULL, "creatorId" integer NOT NULL, "title" character varying NOT NULL, "videoUrl" character varying NOT NULL, "thumbnailUrl" character varying NOT NULL, "youtubeVideoId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2abef7c1e52b7b58a9f905c9643" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_df2838f36274fb26bcc84875069" FOREIGN KEY ("lectureId") REFERENCES "lecture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lecture" ADD CONSTRAINT "FK_938faa35f7903df9f54e7561646" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture" DROP CONSTRAINT "FK_938faa35f7903df9f54e7561646"`);
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_df2838f36274fb26bcc84875069"`);
        await queryRunner.query(`DROP TABLE "lecture"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "note"`);
    }

}

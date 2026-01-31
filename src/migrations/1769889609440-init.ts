import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1769889609440 implements MigrationInterface {
    name = 'Init1769889609440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'guest', "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hotel" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "location" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3a62ac86b369b36c1a297e9ab26" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_type_rate" ("id" integer NOT NULL, "date" date NOT NULL, "rate" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "hotel_id" integer, CONSTRAINT "PK_b47afab3daef9afd94cf4b3921c" PRIMARY KEY ("id", "date"))`);
        await queryRunner.query(`CREATE TABLE "room_type_inventory" ("id" SERIAL NOT NULL, "hotel_id" integer NOT NULL, "room_type_id" integer NOT NULL, "date" date NOT NULL, "total_inventory" bigint NOT NULL, "total_reserved" bigint NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a5b8f9d42448a9790f610fe7bb2" UNIQUE ("hotel_id", "room_type_id", "date"), CONSTRAINT "PK_ca0ad9d19694b5e15fc7b0fdcc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "max_occupancy" integer NOT NULL, "amenities" character varying NOT NULL, "hotel_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_abd0f8a4c8a444a84fa2b343353" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" SERIAL NOT NULL, "floor" integer NOT NULL, "number" integer NOT NULL, "name" character varying NOT NULL, "room_type_id" integer NOT NULL, "is_available" boolean NOT NULL DEFAULT true, "hotel_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" SERIAL NOT NULL, "hotel_id" integer NOT NULL, "room_type_id" integer NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "number_of_rooms" integer NOT NULL, "status" character varying NOT NULL, "guest_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" ADD CONSTRAINT "FK_adb81f11c48ce9dcc5592be7b7b" FOREIGN KEY ("hotel_id") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_type_inventory" ADD CONSTRAINT "FK_3d7f4239d5077e826e43cbf57b6" FOREIGN KEY ("hotel_id") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_type_inventory" ADD CONSTRAINT "FK_787ebf305a462e697b714b7edb3" FOREIGN KEY ("room_type_id") REFERENCES "room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_type" ADD CONSTRAINT "FK_c1d80dd42eb671888afb394d5a2" FOREIGN KEY ("hotel_id") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_64adc22610d065e783248efc7cb" FOREIGN KEY ("hotel_id") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_55b383d0ec20230d193ca584a4a" FOREIGN KEY ("room_type_id") REFERENCES "room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_778aabb1b42cff8c3f766e6a50a" FOREIGN KEY ("hotel_id") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_10591232f599626879cd8e4a6d2" FOREIGN KEY ("room_type_id") REFERENCES "room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_0c93f6d69e4aaf4fd3d71369cb3" FOREIGN KEY ("guest_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_0c93f6d69e4aaf4fd3d71369cb3"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_10591232f599626879cd8e4a6d2"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_778aabb1b42cff8c3f766e6a50a"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_55b383d0ec20230d193ca584a4a"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_64adc22610d065e783248efc7cb"`);
        await queryRunner.query(`ALTER TABLE "room_type" DROP CONSTRAINT "FK_c1d80dd42eb671888afb394d5a2"`);
        await queryRunner.query(`ALTER TABLE "room_type_inventory" DROP CONSTRAINT "FK_787ebf305a462e697b714b7edb3"`);
        await queryRunner.query(`ALTER TABLE "room_type_inventory" DROP CONSTRAINT "FK_3d7f4239d5077e826e43cbf57b6"`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" DROP CONSTRAINT "FK_adb81f11c48ce9dcc5592be7b7b"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "room_type"`);
        await queryRunner.query(`DROP TABLE "room_type_inventory"`);
        await queryRunner.query(`DROP TABLE "room_type_rate"`);
        await queryRunner.query(`DROP TABLE "hotel"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

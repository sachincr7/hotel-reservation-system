import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterIdNaming1769889503051 implements MigrationInterface {
    name = 'AlterIdNaming1769889503051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_type" RENAME COLUMN "room_type_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "room_type" RENAME CONSTRAINT "PK_477eafb69068513310b1a150ccb" TO "PK_abd0f8a4c8a444a84fa2b343353"`);
        await queryRunner.query(`ALTER SEQUENCE "room_type_room_type_id_seq" RENAME TO "room_type_id_seq"`);
        await queryRunner.query(`ALTER TABLE "reservation" RENAME COLUMN "reservation_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "reservation" RENAME CONSTRAINT "PK_1c8fc6b24242c3d8cd5fde324ea" TO "PK_48b1f9922368359ab88e8bfa525"`);
        await queryRunner.query(`ALTER SEQUENCE "reservation_reservation_id_seq" RENAME TO "reservation_id_seq"`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" ADD "id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" DROP CONSTRAINT "PK_7bee6d9071f9adc82d0285eef6b"`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" ADD CONSTRAINT "PK_66d87a6e9256c3f5b0c3d7759a2" PRIMARY KEY ("hotel_id", "date", "id")`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" DROP CONSTRAINT "PK_66d87a6e9256c3f5b0c3d7759a2"`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" ADD CONSTRAINT "PK_b47afab3daef9afd94cf4b3921c" PRIMARY KEY ("id", "date")`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" DROP CONSTRAINT "FK_adb81f11c48ce9dcc5592be7b7b"`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" ALTER COLUMN "hotel_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" DROP CONSTRAINT "PK_66d87a6e9256c3f5b0c3d7759a2"`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" ADD CONSTRAINT "PK_b47afab3daef9afd94cf4b3921c" PRIMARY KEY ("date", "id")`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" ADD CONSTRAINT "FK_adb81f11c48ce9dcc5592be7b7b" FOREIGN KEY ("hotel_id") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_type_rate" DROP CONSTRAINT "FK_adb81f11c48ce9dcc5592be7b7b"`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" DROP CONSTRAINT "PK_b47afab3daef9afd94cf4b3921c"`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" ADD CONSTRAINT "PK_66d87a6e9256c3f5b0c3d7759a2" PRIMARY KEY ("hotel_id", "date", "id")`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" ALTER COLUMN "hotel_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" ADD CONSTRAINT "FK_adb81f11c48ce9dcc5592be7b7b" FOREIGN KEY ("hotel_id") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" DROP CONSTRAINT "PK_b47afab3daef9afd94cf4b3921c"`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" ADD CONSTRAINT "PK_66d87a6e9256c3f5b0c3d7759a2" PRIMARY KEY ("hotel_id", "date", "id")`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" DROP CONSTRAINT "PK_66d87a6e9256c3f5b0c3d7759a2"`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" ADD CONSTRAINT "PK_7bee6d9071f9adc82d0285eef6b" PRIMARY KEY ("hotel_id", "date")`);
        await queryRunner.query(`ALTER TABLE "room_type_rate" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER SEQUENCE "reservation_id_seq" RENAME TO "reservation_reservation_id_seq"`);
        await queryRunner.query(`ALTER TABLE "reservation" RENAME CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" TO "PK_1c8fc6b24242c3d8cd5fde324ea"`);
        await queryRunner.query(`ALTER TABLE "reservation" RENAME COLUMN "id" TO "reservation_id"`);
        await queryRunner.query(`ALTER SEQUENCE "room_type_id_seq" RENAME TO "room_type_room_type_id_seq"`);
        await queryRunner.query(`ALTER TABLE "room_type" RENAME CONSTRAINT "PK_abd0f8a4c8a444a84fa2b343353" TO "PK_477eafb69068513310b1a150ccb"`);
        await queryRunner.query(`ALTER TABLE "room_type" RENAME COLUMN "id" TO "room_type_id"`);
    }

}

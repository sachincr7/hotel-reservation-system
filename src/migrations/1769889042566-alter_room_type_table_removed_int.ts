import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterRoomTypeTableRemovedInt1769889042566 implements MigrationInterface {
    name = 'AlterRoomTypeTableRemovedInt1769889042566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" ADD "number_of_rooms" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "number_of_rooms"`);
    }

}

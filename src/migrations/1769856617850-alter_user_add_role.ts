import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserAddRole1769856617850 implements MigrationInterface {
    name = 'AlterUserAddRole1769856617850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'guest'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }

}

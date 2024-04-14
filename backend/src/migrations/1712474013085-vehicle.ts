import { MigrationInterface, QueryRunner } from 'typeorm';

export class Vehicle1712474013085 implements MigrationInterface {
    name = 'Vehicle1712474013085';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "name" character varying, "plate" character varying, "vin" character varying, "serialNumber" character varying, "createdBy" character varying, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }
}

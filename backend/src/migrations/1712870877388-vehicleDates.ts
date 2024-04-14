import { MigrationInterface, QueryRunner } from 'typeorm';

export class VehicleDates1712870877388 implements MigrationInterface {
    name = 'VehicleDates1712870877388';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "vehicles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
        );
        await queryRunner.query(
            `ALTER TABLE "vehicles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "vehicles" DROP COLUMN "updatedAt"`,
        );
        await queryRunner.query(
            `ALTER TABLE "vehicles" DROP COLUMN "createdAt"`,
        );
    }
}

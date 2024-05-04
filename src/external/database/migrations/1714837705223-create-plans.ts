import { Table, MigrationInterface, QueryRunner } from "typeorm"

export default class Plan1714837705223 implements MigrationInterface {
    table = 'plans'

    async up(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.createTable(
            new Table({
                name: this.table,
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'message_per_month',
                        type: 'int',
                        isNullable: false,
                        default: 100,
                    },
                ],
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.dropTable(this.table)
    }
}





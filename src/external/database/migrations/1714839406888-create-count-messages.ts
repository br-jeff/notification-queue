import { Table, MigrationInterface, QueryRunner } from "typeorm"

export default class countMessage1714839406888 implements MigrationInterface {
    table = 'count_messages'

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
                        name: 'company_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.dropTable(this.table)
    }
}





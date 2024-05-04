import { Table, MigrationInterface, QueryRunner } from "typeorm"

export default class Messages1714839175153 implements MigrationInterface {
    table = 'messages'

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
                        name: 'content',
                        type: 'text',
                        isNullable: false,
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





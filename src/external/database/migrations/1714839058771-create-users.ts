import { Table, MigrationInterface, QueryRunner } from "typeorm"

export default class User1714839058771 implements MigrationInterface {
    table = 'users'

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
                    {
                        name: 'name',
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





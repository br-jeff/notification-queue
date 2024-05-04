import { Table, MigrationInterface, QueryRunner } from "typeorm"

export default class Recipeients1714839267754 implements MigrationInterface {
    table = 'recipeients'

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
                        name: 'message_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'is_open',
                        type: 'boolean',
                        default: false,
                    },
                ],
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.dropTable(this.table)
    }
}





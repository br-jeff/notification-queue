import { Table, MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export default class Plan1714837705223 implements MigrationInterface {
    private table = new Table({
        name: 'plans',
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                isGenerated: true,
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
    })
      
    async up(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.createTable(this.table);
    }

    async down(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.dropTable(this.table)
    }
}





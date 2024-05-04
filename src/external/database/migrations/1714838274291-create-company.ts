import { Table, MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export default class Company1714838274291 implements MigrationInterface {
    private table = new Table({
        name: 'companies',
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'uuid',
            },
            {
                name: 'plan_id',
                type: 'uuid',
                isNullable: false,
            },
        ],
    })

    private foreignKeys = [
        new TableForeignKey({
          columnNames: ['plan_id'],
          referencedTableName: 'plans',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
        }),
    ]

    async up(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.createTable(this.table);
        await queryRunner.createForeignKeys(this.table, this.foreignKeys) 
    }

    async down(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.dropTable(this.table)
    }
}





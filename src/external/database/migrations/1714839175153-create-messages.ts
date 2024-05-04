import { Table, MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export default class Messages1714839175153 implements MigrationInterface {
    private table = new Table({
        name: 'messages',
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'uuid',
            },
            {
                name: 'content',
                type: 'text',
                isNullable: false,
            },
            {
                name: 'company_id',
                type: 'uuid',
                isNullable: false,
            },
        ],
    })

    private foreignKeys = [
        new TableForeignKey({
          columnNames: ['company_id'],
          referencedTableName: 'companies',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
        }),
      ]

    async up(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.createTable(this.table)
        await queryRunner.createForeignKeys(this.table, this.foreignKeys)
    }

    async down(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.dropTable(this.table)
    }
}





import { Table, MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export default class countMessage1714839406888 implements MigrationInterface {
    table = new Table({
        name: 'count_messages' ,
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'uuid'
            },
            {
                name: 'company_id',
                type: 'uuid',
                isNullable: false,
            },
            {
                name: 'date_count',
                type: 'date',
                isNullable: false,
            },
            {
                name: 'count_message',
                type: 'integer',
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





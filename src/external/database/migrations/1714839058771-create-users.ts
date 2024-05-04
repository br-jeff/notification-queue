import { Table, MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export default class User1714839058771 implements MigrationInterface {
    private table = new Table({
        name:  'users',
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
            },
            {
                name: 'company_id',
                type: 'uuid',
                isNullable: false,
            },
            {
                name: 'name',
                type: 'varchar',
                isNullable: false,
            },
            {
                name: 'username',
                type: 'varchar',
                isNullable: false,
            },
            {
                name: 'is_admin',
                type: 'boolean',
                default: false,
            },
            {
                name: 'password',
                type: 'varchar',
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
        })
      ]

    async up(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.createTable(this.table)
        await queryRunner.createForeignKeys(this.table, this.foreignKeys)
    }

    async down(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.dropTable(this.table)
    }
}





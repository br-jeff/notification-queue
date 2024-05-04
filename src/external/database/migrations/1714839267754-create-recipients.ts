import { Table, MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export default class Recipeients1714839267754 implements MigrationInterface {
    table = new Table({
        name: 'recipeients' ,
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'uuid',
            },
            {
                name: 'message_id',
                type: 'uuid',
                isNullable: false,
            },
            {
                name: 'user_id',
                type: 'uuid',
                isNullable: false,
            },
            {
                name: 'is_open',
                type: 'boolean',
                default: false,
            },
        ],
    })

    private foreignKeys = [
        new TableForeignKey({
          columnNames: ['message_id'],
          referencedTableName: 'messages',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
        }),
        new TableForeignKey({
          columnNames: ['user_id'],
          referencedTableName: 'users',
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





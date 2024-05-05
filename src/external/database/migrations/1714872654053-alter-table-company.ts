import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export default class Company1714872654053 implements MigrationInterface {
    private foreignKeys = [
  /*       new TableForeignKey({
            columnNames: ['id'],
            referencedTableName: 'users',
            referencedColumnNames: ['company_id'],
        })    */
    ]

    async up(queryRunner: QueryRunner): Promise <void> {
        // await queryRunner.createForeignKeys('companies', this.foreignKeys)
    }

    async down(queryRunner: QueryRunner): Promise <void> {
    }
}


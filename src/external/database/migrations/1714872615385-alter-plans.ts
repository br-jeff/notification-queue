import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export default class Plans1714872615385 implements MigrationInterface {
/*     private foreignKeys = [
        new TableForeignKey({
          columnNames: ['id'],
          referencedTableName: 'companies',
          referencedColumnNames: ['plan_id'],
          onUpdate: 'CASCADE',
        })
    ] */

    async up(queryRunner: QueryRunner): Promise <void> {
       //  await queryRunner.createForeignKeys('plans', this.foreignKeys) 
    }

    async down(queryRunner: QueryRunner): Promise <void> {
        await queryRunner.dropTable('companies')
    }
}


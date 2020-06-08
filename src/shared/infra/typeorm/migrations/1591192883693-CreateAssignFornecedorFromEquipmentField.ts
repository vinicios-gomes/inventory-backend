import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class CreateAssignFornecedorFromEquipmentField1591192883693 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('equipamentos', 'fornecedor')
      await queryRunner.addColumn('equipamentos', new TableColumn({
        name: 'fornecedor_id',
        type: 'uuid',
        isNullable: true,
      }),
      );
await queryRunner.createForeignKey(
  'equipamentos',
  new TableForeignKey({
    columnNames: ['fornecedor_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'fornecedores',
    name: 'FornecedorEquipamento',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  }),
);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('equipamentos', 'FornecedorEquipamento');
      await queryRunner.dropColumn('equipamentos', 'fornecedor_id');
      await queryRunner.addColumn('equipamentos', new TableColumn({
        name: 'fornecedor',
        type: 'varchar',
        isNullable: true
      }))
    }

}

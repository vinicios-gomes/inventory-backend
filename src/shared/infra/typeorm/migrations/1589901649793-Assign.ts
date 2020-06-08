import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class Assign1589901649793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'assigns',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'colab_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'equipment_id',
            type: 'uuid',
          },
          {
            name: 'data_inicial',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'data_final',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'assigns',
      new TableForeignKey({
        columnNames: ['colab_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'collaborators',
        name: 'ColabRef',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'assigns',
      new TableForeignKey({
        columnNames: ['equipment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'equipamentos',
        name: 'EquipmentRef',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('assigns', 'ColabRef');
    await queryRunner.dropForeignKey('assigns', 'EquipmentRef');
    await queryRunner.dropTable('assigns');
  }
}

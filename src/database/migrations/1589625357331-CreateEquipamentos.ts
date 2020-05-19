import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEquipamentos1589625357331
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'equipamentos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'patrimonio',
            type: 'integer',
          },
          {
            name: 'garantia',
            type: 'timestamp',
          },
          {
            name: 'serial_number',
            type: 'varchar',
          },
          {
            name: 'tipo_item',
            type: 'varchar',
          },
          {
            name: 'modelo',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'entidade',
            type: 'varchar',
          },
          {
            name: 'sinal',
            type: 'varchar',
          },
          {
            name: 'id_item',
            type: 'varchar',
          },
          {
            name: 'obs',
            type: 'varchar',
            isNullable: true,
          },

          {
            name: 'fornecedor',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('equipamentos');
  }
}

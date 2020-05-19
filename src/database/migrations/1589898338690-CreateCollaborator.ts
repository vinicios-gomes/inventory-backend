import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCollaborator1589898338690
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'collaborators',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'matricula',
            type: 'integer',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'departamento_id',
            type: 'uuid',
          },
          {
            name: 'cargo_id',
            type: 'uuid',
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
      'collaborators',
      new TableForeignKey({
        columnNames: ['cargo_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cargos',
        name: 'ColabCargo',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'collaborators',
      new TableForeignKey({
        columnNames: ['departamento_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'departamentos',
        name: 'ColabDepart',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'collaborators',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'ColabUserID',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('collaborators', 'ColabUserId');
    await queryRunner.dropForeignKey('collaborators', 'ColabCargo');
    await queryRunner.dropForeignKey('collaborators', 'ColabDepart');
    await queryRunner.dropTable('collaborators');
  }
}

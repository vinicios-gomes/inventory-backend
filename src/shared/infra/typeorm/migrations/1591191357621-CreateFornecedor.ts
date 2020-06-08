import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateFornecedor1591191357621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'fornecedores',
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
              name: 'nome',
              type: 'varchar',
            },
            {
              name: 'cnpj',
              type: 'varchar',
            },
            {
              name: 'razaosocial',
              type: 'varchar',
            },
            {
              name: 'endereco',
              type: 'varchar',
            },
            {
              name: 'estado',
              type: 'varchar'
            },
            {
              name: 'municipio',
              type: 'varchar'
            },
            {
              name: 'inscricaomunicipal',
              type: 'varchar'
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
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('fornecedores')
    }

}

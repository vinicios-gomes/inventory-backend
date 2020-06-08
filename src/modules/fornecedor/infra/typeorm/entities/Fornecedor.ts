import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity('fornecedores')
export default class Fornecedor{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  razaosocial: string;

  @Column()
  endereco: string;

  @Column()
  estado: string;

  @Column()
  municipio: string;

  @Column()
  inscricaomunicipal: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

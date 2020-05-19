import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('equipamentos')
export default class Equipamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patrimonio: number;

  @Column('timestamp with time zone')
  garantia: Date;

  @Column()
  serial_number: string;

  @Column()
  tipo_item: string;

  @Column()
  modelo: string;

  @Column()
  status: string;

  @Column()
  entidade: string;

  @Column()
  sinal: string;

  @Column()
  id_item: string;

  @Column()
  fornecedor: string;

  @Column()
  obs: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Collaborator from './Collaborator';
import Equipamento from './Equipamento';

@Entity('assigns')
export default class Assign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  colab_id: string;

  @ManyToOne(() => Collaborator)
  @JoinColumn({ name: 'colab_id' })
  collaborator: Collaborator;

  @Column()
  equipment_id: string;

  @ManyToOne(() => Equipamento)
  @JoinColumn({ name: 'equipment_id' })
  equipamento: Equipamento;

  @Column('time with time zone')
  data_inicial: Date;

  @Column('time with time zone')
  data_final: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

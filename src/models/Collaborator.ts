import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Departamento from './Departamento';
import Cargo from './Cargo';
import User from './User';

@Entity('collaborators')
export default class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  matricula: number;

  @Column()
  email: string;

  @Column()
  departamento_id: string;

  @Column()
  cargo_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Departamento)
  @JoinColumn({ name: 'departamento_id' })
  departamento: Departamento;

  @ManyToOne(() => Cargo)
  @JoinColumn({ name: 'cargo_id' })
  cargo: Cargo;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

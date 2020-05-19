import { EntityRepository, Repository } from 'typeorm';

import Equipamento from '../models/Equipamento';

@EntityRepository(Equipamento)
export default class EquipamentosRepository extends Repository<Equipamento> {}

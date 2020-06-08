import { EntityRepository, Repository } from 'typeorm';

import Equipments from '@modules/equipment/infra/typeorm/entities/Equipamento'
import IEquipmentsRepository from '@modules/equipment/repositories/IEquipmentsRepository'

import AppError from '@shared/errors/AppError'

@EntityRepository(Equipments)
export default class EquipamentosRepository extends Repository<Equipments> implements IEquipmentsRepository {
  public async findEquipByPat(patrimonio: string){
    const findEquipamento = await this.findOne({
      where: {patrimonio}
    })
    if(!findEquipamento){
      throw new AppError('Não há equipamento cadastrado com este patrimonio.', 400)
    }
    return findEquipamento;
  }
}

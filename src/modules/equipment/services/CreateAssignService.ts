import { getCustomRepository } from 'typeorm';
import { format } from 'date-fns';
import Assign from '@modules/equipment/infra/typeorm/entities/Assign';

import AssignRepository from '@modules/equipment/infra/typeorm/repositories/AssignRepository'
import EquipamentoRepository from '@modules/equipment/infra/typeorm/repositories/EquipamentosRepository'
import CollaboratorRepository from '@modules/collaborators/infra/typeorm/repositories/CollaboratorRepository'

import AppError from '@shared/errors/AppError';

interface RequestDTO {
  matricula: string;
  patrimonio: string;
}
export default class CreateAssignService {
  public async execute({
    matricula,
    patrimonio,
  }: RequestDTO): Promise<Assign> {
    const assignRepository = getCustomRepository(AssignRepository);
    const equipmentRepository = getCustomRepository(EquipamentoRepository)
    const collabRepository = getCustomRepository(CollaboratorRepository);

    const equipamento = await equipmentRepository.findEquipByPat(patrimonio);
    const collaborator = await collabRepository.findByMat(matricula)

    const checkIfHaveAssign = await assignRepository.find({
      where: { colab_id: collaborator.id, equipment_id: equipamento.id },
    });

    if (!checkIfHaveAssign) {
      throw new AppError('O equipamento está associado a um colaborador');
    }

    const assign = assignRepository.create({
      colab_id: collaborator.id,
      equipment_id: equipamento.id,
      data_inicial: new Date(),
    });

    await assignRepository.save(assign);

    return assign;
  }
}

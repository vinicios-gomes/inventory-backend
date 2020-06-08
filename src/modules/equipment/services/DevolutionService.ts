import { getCustomRepository } from 'typeorm';
import { format } from 'date-fns';

import AssignRepository from '@modules/equipment/infra/typeorm/repositories/AssignRepository';
import EquipmentRepository from '@modules/equipment/infra/typeorm/repositories/EquipamentosRepository';
import CollaboratorRepository from '@modules/collaborators/infra/typeorm/repositories/CollaboratorRepository';

import Assign from '@modules/equipment/infra/typeorm/entities/Assign'
import AppError from '@shared/errors/AppError';

interface RequestDTO {
  // id: string;
  patrimonio: string;
  matricula: string | null;
  // colab_id: string | null;
  // equipment_id: string;
}

export default class DeveloperEquipmentService {
  public async execute({
    // colab_id,
    // equipment_id,
    matricula, patrimonio
  }: RequestDTO): Promise<Assign> {
    const assignRepository = getCustomRepository(AssignRepository);
    const colabRepository = getCustomRepository(CollaboratorRepository);
    const equipmentRepository = getCustomRepository(EquipmentRepository);

    const colaborador = await colabRepository.findByMat(matricula);
    const equipamento = await equipmentRepository.findEquipByPat(patrimonio)

    const checkIfExists = await assignRepository.findOne({
      where: {colab_id: colaborador.id , equipment_id: equipamento.id}
    });

    if (!checkIfExists) {
      throw new AppError('O colaborador não possui ferramenta');
    }

    const date = format(new Date(), 'yyyy-MM-dd');

    const ascc = await assignRepository.update(checkIfExists.id, {
      data_final: date,
    });

    return checkIfExists;
  }
}

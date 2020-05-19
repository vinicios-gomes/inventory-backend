import { getCustomRepository } from 'typeorm';
import { format } from 'date-fns';
import AssignRepository from '../repository/AssignRepository';
import Assign from '../models/Assign';
import AppError from '../errors/AppError';

interface RequestDTO {
  // id: string;
  colab_id: string | null;
  equipment_id: string;
}

export default class DeveloperEquipmentService {
  public async execute({
    colab_id,
    equipment_id,
  }: RequestDTO): Promise<Assign> {
    const assignRepository = getCustomRepository(AssignRepository);

    const checkIfExists = await assignRepository.findOne({
      where: { colab_id, equipment_id },
    });

    if (!checkIfExists) {
      throw new AppError('O colaborador não possui ferramenta');
    }

    const date = format(new Date(), 'yyyy-MM-dd');
    const assign = await assignRepository.update(checkIfExists.id, {
      colab_id: null,
      data_final: date,
    });

    return assign;
  }
}

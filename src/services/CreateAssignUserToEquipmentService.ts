import { getCustomRepository } from 'typeorm';
import { format } from 'date-fns';
import Assign from '../models/Assign';
import AssignRepository from '../repository/AssignRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  colab_id: string;
  equipment_id: string;
}
export default class CreateAssignService {
  public async execute({
    colab_id,
    equipment_id,
  }: RequestDTO): Promise<Assign> {
    const assignRepository = getCustomRepository(AssignRepository);

    const checkIfHaveAssign = await assignRepository.find({
      where: { colab_id, equipment_id },
    });

    if (!checkIfHaveAssign) {
      throw new AppError('O equipamento está associado a um colaborador');
    }

    const assign = assignRepository.create({
      colab_id,
      equipment_id,
      data_inicial: new Date(),
    });

    await assignRepository.save(assign);

    return assign;
  }
}

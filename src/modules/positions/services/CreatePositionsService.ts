import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import Position from '@modules/positions/infra/typeorm/entities/Position'

interface RequestDTO {
  name: string;
  nivel: string;
}

export default class CreateCargosService {
  public async execute({ name, nivel }: RequestDTO): Promise<Position> {
    const positionRepository = getRepository(Position);

    const positionExists = await positionRepository.find({
      where: { name },
    });

    if (!positionExists) {
      throw new AppError('O cargo já existe!', 401);
    }

    const cargos = await positionRepository.create({
      name,
      nivel,
    });

    await positionRepository.save(cargos);

    return cargos;
  }
}

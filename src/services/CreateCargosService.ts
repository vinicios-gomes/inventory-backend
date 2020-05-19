import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Cargo from '../models/Cargo';

interface RequestDTO {
  name: string;
  nivel: string;
}

export default class CreateCargosService {
  public async execute({ name, nivel }: RequestDTO): Promise<Cargo> {
    const cargosRepository = getRepository(Cargo);

    const cargosExists = await cargosRepository.find({
      where: { name },
    });

    if (!cargosExists) {
      throw new AppError('O cargo já existe!', 401);
    }

    const cargos = await cargosRepository.create({
      name,
      nivel,
    });

    await cargosRepository.save(cargos);

    return cargos;
  }
}

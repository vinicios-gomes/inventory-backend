import { getRepository } from 'typeorm';
import Departamento from '../models/Departamento';
import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  centro_custo: string;
}

export default class CreateDepartamentosService {
  public async execute({
    name,
    centro_custo,
  }: RequestDTO): Promise<Departamento> {
    const departamentoRepository = getRepository(Departamento);

    const departamentoExists = await departamentoRepository.find({
      where: { name },
    });

    if (!departamentoExists) {
      throw new AppError('Departamento já existe!', 401);
    }

    const departamento = await departamentoRepository.create({
      name,
      centro_custo,
    });

    await departamentoRepository.save(departamento);

    return departamento;
  }
}

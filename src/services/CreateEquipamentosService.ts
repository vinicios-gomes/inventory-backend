import { getCustomRepository } from 'typeorm';
import Equipamento from '../models/Equipamento';
import EquipamentosRepository from '../repository/EquipamentosRepository';

import AppError from '../errors/AppError';

interface RequestDTO {
  patrimonio: number;
  garantia: Date;
  serial_number: string;
  tipo_item: string;
  modelo: string;
  status: 'operacional' | 'nao operacional';
  entidade: 'alugado' | 'proprio';
  sinal: string;
  id_item: string;
  fornecedor: string;
  obs: string;
}

export default class CreateEquipamentosService {
  public async execute({
    patrimonio,
    garantia,
    serial_number,
    tipo_item,
    modelo,
    status,
    entidade,
    sinal,
    id_item,
    fornecedor,
    obs,
  }: RequestDTO): Promise<Equipamento> {
    const equipamentosRepository = getCustomRepository(EquipamentosRepository);

    const equipamentoExists = equipamentosRepository.findOne({
      where: { patrimonio },
    });

    if (!equipamentoExists) {
      throw new AppError('Equipamento já cadastrado', 401);
    }

    const equipamento = await equipamentosRepository.create({
      patrimonio,
      garantia,
      serial_number,
      tipo_item,
      modelo,
      status,
      entidade,
      sinal,
      id_item,
      fornecedor,
      obs,
    });

    await equipamentosRepository.save(equipamento);

    return equipamento;
  }
}

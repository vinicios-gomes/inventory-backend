import { getCustomRepository } from 'typeorm';
import Equipamento from '@modules/equipment/infra/typeorm/entities/Equipamento';
import EquipamentosRepository from '@modules/equipment/infra/typeorm/repositories/EquipamentosRepository'
import FornecedorRepository from '@modules/fornecedor/infra/typeorm/repositories/FornecedorRepositorie';

import AppError from '@shared/errors/AppError';

interface RequestDTO {
  patrimonio: number;
  garantia?: Date;
  serial_number?: string;
  tipo_item?: string;
  modelo?: string;
  status?: 'operacional' | 'nao operacional';
  entidade?: 'alugado' | 'proprio';
  sinal?: string;
  id_item?: string;
  fornecedor_id?: string;
  obs?: string;
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
    fornecedor_id,
    obs,
  }: RequestDTO): Promise<Equipamento> {
    const equipamentosRepository = getCustomRepository(EquipamentosRepository);
    const fornecedorRepository = getCustomRepository(FornecedorRepository);

    const findFornecedorByCnpj = await fornecedorRepository.findByCnpj(fornecedor_id);


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
      fornecedor_id: findFornecedorByCnpj.id,
      obs,
    });

    await equipamentosRepository.save(equipamento);

    return equipamento;
  }
}

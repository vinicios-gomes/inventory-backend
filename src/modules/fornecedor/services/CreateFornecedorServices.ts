import {getCustomRepository} from 'typeorm'
import Fornecedor from '@modules/fornecedor/infra/typeorm/entities/Fornecedor'
import FornecedorRepository from '@modules/fornecedor/infra/typeorm/repositories/FornecedorRepositorie'

import AppError from '@shared/errors/AppError'

interface RequestDTO{
  nome: string;
  cnpj: string;
  razaosocial: string;
  endereco: string;
  estado: string;
  municipio: string;
  inscricaomunicipal: string;
}

export default class CreateFornecedorServices{
  public async execute({
    nome,
    cnpj,
    razaosocial,
    endereco,
    estado,
    municipio,
    inscricaomunicipal,
  }: RequestDTO): Promise<Fornecedor>{
    const fornecedorRepository = getCustomRepository(FornecedorRepository);

    const fornecedorExists = fornecedorRepository.findOne({where: {cnpj}})

    if(fornecedorExists){
      throw new AppError('Fornecedor já cadastrado', 401)
    }

    const fornecedor = await fornecedorRepository.create({
    nome,
    cnpj,
    razaosocial,
    endereco,
    estado,
    municipio,
    inscricaomunicipal,
    })

    await fornecedorRepository.save(fornecedor);

    return fornecedor;

  }
}

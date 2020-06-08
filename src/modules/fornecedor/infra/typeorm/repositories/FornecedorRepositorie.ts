import {EntityRepository, Repository} from 'typeorm'

import Fornecedor from '@modules/fornecedor/infra/typeorm/entities/Fornecedor';
import IFornecedorRepository from '@modules/fornecedor/repositories/IFornecedorRepositories';

import AppError from '@shared/errors/AppError'

@EntityRepository(Fornecedor)
export default class FornecedorRepository extends Repository<Fornecedor> implements IFornecedorRepository{
  public async findByCnpj(cnpj: string): Promise<Fornecedor | undefined>{
    const findFornecedor = await this.findOne({
      where: {cnpj}
    });

    if(!findFornecedor){
      throw new AppError('Não há fornecedores cadastrados com este CNPJ.', 400)
    }

    return findFornecedor;
  }
}

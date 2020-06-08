import Fornecedor from '@modules/fornecedor/infra/typeorm/entities/Fornecedor'

export default interface IFornecedorRepository{
  findByCnpj(cnpj: string): Promise<Fornecedor | undefined>;
}

import {Router} from 'express'
import {getCustomRepository} from 'typeorm'

import CreateFornecedorService from '@modules/fornecedor/services/CreateFornecedorServices';
import FornecedorRepository from '@modules/fornecedor/infra/typeorm/repositories/FornecedorRepositorie'

import AppError from '@shared/errors/AppError'

const fornecedorRoute = Router();

fornecedorRoute.post('/', async (request, response) => {
  const {
    nome, cnpj, razaosocial, endereco, estado, municipio, inscricaomunicipal
  } = request.body

  const createFornecedor = new CreateFornecedorService();

  const fornecedores = await createFornecedor.execute({
    nome, cnpj, razaosocial, endereco, estado, municipio, inscricaomunicipal

  })

  return response.status(200).json(fornecedores)
});

fornecedorRoute.get('/', async (request, response) => {
  const fornecedorRepository = getCustomRepository(FornecedorRepository);

  const fornecedores = await fornecedorRepository.find();

  if(!fornecedores){
    throw new AppError('Não há fornecedores cadastrados', 400)
  }

  return response.status(200).json(fornecedores)
});

fornecedorRoute.delete('/:id', async (request, resposne) => {
  const fornecedorRepository = getCustomRepository(FornecedorRepository);

  const {id} = request.params

  await fornecedorRepository.delete(id)

  return resposne.status(200).json("Fornecedor deletado")

})

export default fornecedorRoute;

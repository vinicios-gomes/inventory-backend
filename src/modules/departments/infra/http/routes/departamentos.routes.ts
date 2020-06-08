import { Router } from 'express';

import { getRepository } from 'typeorm';
import CreateDepartamentoService from '@modules/departments/services/CreateDepartamentosService';
import Departamento from '@modules/departments/infra/typeorm/entities/Departamento'
// import ensureAuthenticated from '@modules/users/infra/middleware/ensureAuthenticated';

const departamentoRouter = Router();
// departamentoRouter.use(ensureAuthenticated);

departamentoRouter.post('/', async (request, response) => {
  const { name, centro_custo } = request.body;

  const createDepartamento = new CreateDepartamentoService();

  const departamento = await createDepartamento.execute({ name, centro_custo });

  return response.status(200).json(departamento);
});

departamentoRouter.get('/', async (request, response) => {
  const departamentoRepository = getRepository(Departamento);

  const departamento = await departamentoRepository.find();

  return response.status(200).json(departamento);
});

departamentoRouter.get('/:id', async (request, response) => {
  const departamentoRepository = getRepository(Departamento);
  const { id } = request.params;

  const departamento = await departamentoRepository.findOne(id);

  return response.status(200).json(departamento);
});

export default departamentoRouter;

import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateCargosService from '../services/CreateCargosService';
import Cargo from '../models/Cargo';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const cargosRouter = Router();
cargosRouter.use(ensureAuthenticated);

cargosRouter.post('/', async (request, response) => {
  const { name, nivel } = request.body;

  const createCargo = new CreateCargosService();

  const cargo = await createCargo.execute({ name, nivel });

  return response.status(200).json(cargo);
});

cargosRouter.get('/', async (request, response) => {
  const cargoRepository = getRepository(Cargo);

  const cargo = await cargoRepository.find();

  return response.status(200).json(cargo);
});

cargosRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const cargoRepository = getRepository(Cargo);

  const cargo = await cargoRepository.findOne(id);

  return response.status(200).json(cargo);
});

export default cargosRouter;

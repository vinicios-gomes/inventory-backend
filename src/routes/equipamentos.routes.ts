import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateEquipamentosService from '../services/CreateEquipamentosService';
import EquipamentosRepository from '../repository/EquipamentosRepository';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const equipamentosRouter = Router();
equipamentosRouter.use(ensureAuthenticated);

equipamentosRouter.post('/', async (request, response) => {
  const {
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
  } = request.body;

  const createEquipamentos = new CreateEquipamentosService();

  const equipamentos = await createEquipamentos.execute({
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

  return response.status(201).json(equipamentos);
});

equipamentosRouter.get('/', async (request, response) => {
  const equipamentosRepository = getCustomRepository(EquipamentosRepository);

  const equipamentos = await equipamentosRepository.find();

  return response.status(200).json(equipamentos);
});

equipamentosRouter.get('/:patrimonio', async (request, response) => {
  const { id } = request.params;
  const equipamentosRepository = getCustomRepository(EquipamentosRepository);

  const equipamentos = await equipamentosRepository.findOne(id);

  return response.status(200).json(equipamentos);
});

export default equipamentosRouter;

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateEquipamentosService from '@modules/equipment/services/CreateEquipamentosService';
import EquipamentosRepository from '@modules/equipment/infra/typeorm/repositories/EquipamentosRepository'

// import ensureAuthenticated from '@modules/users/infra/middleware/ensureAuthenticated';

const equipamentosRouter = Router();
// equipamentosRouter.use(ensureAuthenticated);

equipamentosRouter.post('/', async (request, response) => {
  const createEquipamentos = new CreateEquipamentosService();
  const {
    patrimonio,
    id_item,
    garantia,
    serial_number,
    tipo_item,
    modelo,
    status,
    entidade,
    sinal,
    fornecedor_id,
    obs,
  } = request.body;


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
    fornecedor_id,
    obs,
  });

  return response.status(201).json(equipamentos);
});

equipamentosRouter.get('/', async (request, response) => {
  const equipamentosRepository = getCustomRepository(EquipamentosRepository);

  const equipamentos = await equipamentosRepository.find({
    relations: ['fornecedor']
  });

  return response.status(200).json(equipamentos);
});

equipamentosRouter.get('/:patrimonio', async (request, response) => {
  const { id } = request.params;
  const equipamentosRepository = getCustomRepository(EquipamentosRepository);

  const equipamentos = await equipamentosRepository.findOne(id, {relations: ['fornecedor']});

  return response.status(200).json(equipamentos);
});

export default equipamentosRouter;

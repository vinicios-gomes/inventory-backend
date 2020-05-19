import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AssignRepository from '../repository/AssignRepository';
import CreateAssignassignusereqpService from '../services/CreateAssignUserToEquipmentService';
import DevolutionService from '../services/DevolutionService';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const assignRouter = Router();
assignRouter.use(ensureAuthenticated);

assignRouter.post('/', async (request, response) => {
  const { colab_id, equipment_id } = request.body;

  const createAssign = new CreateAssignassignusereqpService();

  const assign = await createAssign.execute({
    colab_id,
    equipment_id,
  });

  return response.status(200).json(assign);
});

assignRouter.get('/', async (request, response) => {
  const assignRepository = getCustomRepository(AssignRepository);

  const history = await assignRepository.find({
    order: { data_inicial: 'DESC', equipment_id: 'DESC' },
    relations: ['collaborator', 'equipamento'],
  });

  return response.status(200).json(history);
});

assignRouter.put('/', async (request, response) => {
  const devolutionService = new DevolutionService();

  const { colab_id, equipment_id } = request.body;

  const assign = await devolutionService.execute({ colab_id, equipment_id });

  return response.status(204).json(assign);
});

export default assignRouter;

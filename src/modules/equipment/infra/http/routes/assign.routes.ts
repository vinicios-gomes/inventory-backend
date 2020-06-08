import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AssignRepository from '@modules/equipment/infra/typeorm/repositories/AssignRepository'
import CreateAssignassignusereqpService from '@modules/equipment/services/CreateAssignService';
import DevolutionService from '@modules/equipment/services/DevolutionService';

// import ensureAuthenticated from '@modules/users/infra/middleware/ensureAuthenticated';

const assignRouter = Router();
// assignRouter.use(ensureAuthenticated);

assignRouter.post('/', async (request, response) => {
  const { matricula, patrimonio } = request.body;

  const createAssign = new CreateAssignassignusereqpService();

  const assign = await createAssign.execute({
    matricula,
    patrimonio,
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

  const { matricula, patrimonio } = request.body;

  const assign = await devolutionService.execute({ matricula, patrimonio });

  return response.status(204).json(assign);
});

export default assignRouter;

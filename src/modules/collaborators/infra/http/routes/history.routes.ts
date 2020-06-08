import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AssignRepository from '@modules/equipment/infra/typeorm/repositories/AssignRepository';
import EquipmentRepository from '@modules/equipment/infra/typeorm/repositories/EquipamentosRepository'
// import ensureAuthenticated from '@modules/users/infra/middleware/ensureAuthenticated';

const historyRouter = Router();
// historyRouter.use(ensureAuthenticated);

historyRouter.get('/:patrimonio', async (request, response) => {
  const assignRepository = getCustomRepository(AssignRepository);
  const equipmentRepository = getCustomRepository(EquipmentRepository);

  const { patrimonio } = request.params;

  const equipment = await equipmentRepository.findEquipByPat(patrimonio)

  if (!equipment) {
    return response
      .status(404)
      .json({ error: 'Número do patrimonio incorreto' });
  }

  const history = await assignRepository.find({
    where: { equipment_id: equipment.id },
    relations: ['equipamento', 'collaborator']
  });

  return response.status(201).json(history);
});

export default historyRouter;

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CollaboratorRepository from '@modules/collaborators/infra/typeorm/repositories/CollaboratorRepository'
import CreateCollaboratorService from '@modules/collaborators/services/CreateCollaboratorService';

const collaboratorRouter = Router();

collaboratorRouter.post('/', async (request, response) => {
  const createCollab = new CreateCollaboratorService();
  const {
    name,
    matricula,
    email,
    departamento_id,
    cargo_id,
    user_id,
  } = request.body;

  const collaborator = await createCollab.execute({
    name,
    matricula,
    email,
    departamento_id,
    cargo_id,
    user_id,
  });

  return response.status(200).json(collaborator);
});
collaboratorRouter.get('/', async (request, response) => {
  const collaboratorRepository = getCustomRepository(CollaboratorRepository);

  const collaborator = await collaboratorRepository.find({
    relations: ['user', 'departamento', 'cargo'],
    order: {
      user: 'ASC',
    },
  });

  return response.status(200).json(collaborator);
});

export default collaboratorRouter;

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repository/UserRepository';

import CreateUsersService from '../services/CreateUsersService';
import DeleteUserService from '../services/DeleteUserService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.find();

  return response.json(user);
});

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({
    where: { id },
  });

  return response.json(user);
});

usersRouter.post('/', async (request, response) => {
  const { name, login, email, password, provider } = request.body;

  const createUser = new CreateUsersService();

  const user = await createUser.execute({
    name,
    login,
    email,
    password,
    provider,
  });
  delete user.password;

  return response.status(200).json(user);
});

usersRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const deleteUser = new DeleteUserService();

  await deleteUser.execute(id);

  return response.status(204).json();
});

export default usersRouter;

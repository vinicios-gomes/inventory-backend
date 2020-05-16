import { Router } from 'express';

import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.get('/', (request, response) => {
  return response.status(200).json({ local: '/' });
});

export default routes;

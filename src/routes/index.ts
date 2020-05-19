import { Router } from 'express';

import usersRouter from './users.routes';
import departamentosRouter from './departamentos.routes';
import cargosRouter from './cargos.routes';
import equipamentosRouter from './equipamentos.routes';
import assignRouter from './assign.routes';
import historyRouter from './history.routes';
import sessionsRouter from './sessions.routes';
import collaboratorRouter from './collaborator.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/departamentos', departamentosRouter);
routes.use('/cargos', cargosRouter);
routes.use('/equipamentos', equipamentosRouter);
routes.use('/assign', assignRouter);
routes.use('/history', historyRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/collaborator', collaboratorRouter);

routes.get('/', (request, response) => {
  return response.status(200).json({ local: '/' });
});

export default routes;

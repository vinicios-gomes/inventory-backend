import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import departmentsRouter from '@modules/departments/infra/http/routes/departamentos.routes';
import positionsRouter from '@modules/positions/infra/routes/positions.routes';
import equipmentsRouter from '@modules/equipment/infra/http/routes/equipaments.routes';
import assignRouter from '@modules/equipment/infra/http/routes/assign.routes';
import historyRouter from '@modules/collaborators/infra/http/routes/history.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import collaboratorRouter from '@modules/collaborators/infra/http/routes/collaborator.routes';
import fornecedorRouter from '@modules/fornecedor/infra/http/routes/fornecedor.routes'

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/departamentos', departmentsRouter);
routes.use('/cargos', positionsRouter);
routes.use('/equipamentos', equipmentsRouter);
routes.use('/assign', assignRouter);
routes.use('/history', historyRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/collaborator', collaboratorRouter);
routes.use('/fornecedor', fornecedorRouter);

routes.get('/', (request, response) => {
  return response.status(200).json({ local: '/' });
});

export default routes;

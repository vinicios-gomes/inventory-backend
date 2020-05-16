import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default usersRouter;


import { Router } from 'express';
import studentRouter from './student.routes';

const routes = Router();

routes.use('/students', studentRouter);

export default routes;
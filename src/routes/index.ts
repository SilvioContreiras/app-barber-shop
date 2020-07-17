import { Router } from 'express';
import appoitmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appoitments', appoitmentsRouter);

export default routes;

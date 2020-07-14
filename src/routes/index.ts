import { Router } from 'express';
import appoitmentsRouter from './appoitments.routes';

const routes = Router();

routes.use('/appoitments', appoitmentsRouter);

export default routes;

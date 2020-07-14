import { Router } from 'express';
import { uuid } from 'uuidv4';

const appoitmentsRouter = Router();

type Appoitment = {
  id: number,
  provider: string,
}

const appoitments: Appoitment[] = [];

appoitmentsRouter.get('/', (req, res) => {
  res.status(200).json({ appoitments });
});

appoitmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const appoitment = {
    id: uuid(),
    provider,
    date,
  };

  appoitments.push(appoitment);

  return res.status(200).json(appoitment);
});

export default appoitmentsRouter;

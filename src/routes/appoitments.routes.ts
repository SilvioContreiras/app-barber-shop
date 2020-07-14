import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appoitmentsRouter = Router();

type Appoitment = {
  id: string;
  provider: string;
  date:Date;
}

const appoitments: Appoitment[] = [];

appoitmentsRouter.get('/', (req, res) => {
  res.status(200).json({ appoitments });
});

appoitmentsRouter.post("/", (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentBooked = appoitments.find((appoitment) => isEqual(appoitment.date, parsedDate));

  if (findAppointmentBooked) {
    return res.status(201).json({ message: 'Appoitment already booked' });
  }

  const appoitment = {
    id: uuid(),
    provider,
    date,
  };

  appoitments.push(appoitment);

  return res.status(200).json(appoitment);
});

export default appoitmentsRouter;

import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appoitment from '../models/Appoitments';

const appoitmentsRouter = Router();

const appoitments: Appoitment[] = [];

appoitmentsRouter.get('/', (req, res) => {
  res.status(200).json({ appoitments });
});

appoitmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentBooked = appoitments.find(appoitment =>
    isEqual(appoitment.date, parsedDate),
  );

  if (findAppointmentBooked) {
    return res.status(201).json({ message: 'Appoitment already booked' });
  }

  const appoitment = new Appoitment(provider, parsedDate);

  appoitments.push(appoitment);

  return res.status(200).json(appoitment);
});

export default appoitmentsRouter;

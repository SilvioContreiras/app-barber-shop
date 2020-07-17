import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppoitmentRepo from '../repositories/AppointmentsRepo';

const appoitmentsRouter = Router();
const appointmentRepo = new AppoitmentRepo();

appoitmentsRouter.get('/', (req, res) => {
  const appointments = appointmentRepo.getAll();

  res.status(200).json(appointments);
});

appoitmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentBooked = appointmentRepo.findByDate(parsedDate);

  if (findAppointmentBooked) {
    return res.status(201).json({ message: 'Appoitment already booked' });
  }

  const appoitment = appointmentRepo.create(provider, parsedDate);

  return res.status(200).json(appoitment);
});

export default appoitmentsRouter;

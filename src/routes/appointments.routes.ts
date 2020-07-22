import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppoitmentRepo from '../repositories/AppointmentsRepo';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appoitmentsRouter = Router();
const appointmentRepo = new AppoitmentRepo();

appoitmentsRouter.get('/', (req, res) => {
  const appointments = appointmentRepo.getAll();

  res.status(200).json(appointments);
});

appoitmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(appointmentRepo);

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return res.status(200).json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appoitmentsRouter;

import { startOfHour } from 'date-fns';
import Appointment from '../models/Appoitments';
import AppointmentRepo from '../repositories/AppointmentsRepo';

// DTO
interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepo: AppointmentRepo;

  // Dependency Inversion
  constructor(appointmentRepo: AppointmentRepo) {
    this.appointmentRepo = appointmentRepo;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentBooked = this.appointmentRepo.findByDate(
      appointmentDate,
    );

    if (findAppointmentBooked) {
      throw Error('Appoitment already booked');
    }

    const appointment = this.appointmentRepo.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

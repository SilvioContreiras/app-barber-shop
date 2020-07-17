import { isEqual } from 'date-fns';
import Appointment from '../models/Appoitments';

// DTO -Data Transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentRepo {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public getAll(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appoitment =>
      isEqual(date, appoitment.date),
    );

    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentRepo;

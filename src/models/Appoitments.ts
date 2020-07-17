import { uuid } from 'uuidv4';

class Appoitment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appoitment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appoitment;

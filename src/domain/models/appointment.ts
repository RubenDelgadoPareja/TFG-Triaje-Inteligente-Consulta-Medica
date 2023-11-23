import { Patient } from './patient';

// Entity Appointment
export class Appointment {
  constructor(
    public readonly id: number,
    public readonly date: string, // TODO: Change to DateTime
    public readonly paciente: Patient,
    public readonly location: string,
    public readonly isActive: boolean,
  ) {}
}

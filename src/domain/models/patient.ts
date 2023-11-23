import { Appointment } from './appointment';

export class Patient {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly socialSecurity: number,
    public readonly riks: number,
    public readonly medicalHistory: Appointment[],
  ) {}
}

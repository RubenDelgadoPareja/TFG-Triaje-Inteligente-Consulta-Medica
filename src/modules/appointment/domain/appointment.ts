import { DateTime } from 'luxon';

// Entity Appointment - WIP can change to Aggregate
export class Appointment {
  constructor(
    private readonly id: number,
    private readonly patientId: number, // Relationship of dependece. An appointment CAN NOT exist without a Patient
    private date: DateTime, // Should be Value object to validate to be inside Medical hours and when create a new Appointment it has to be 2 days ago from now
    private isActive: boolean,
  ) {}

  // When create a new Appointment we have to validate the Pacient the Date / hour to be in working hours
  get isMedicalHour(): boolean {
    const hour = this.date.hour;
    return hour >= 8 && hour <= 17;
  }
}

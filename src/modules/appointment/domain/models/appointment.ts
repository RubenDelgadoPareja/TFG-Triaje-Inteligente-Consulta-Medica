import { DateTime } from 'luxon';
import { HealthRiskEnum } from './risk';

// Entity Appointment - WIP can change to Aggregate
export class Appointment {
  constructor(
    public readonly id: number,
    public readonly date: DateTime,
    public readonly patientId: number, // Relationship of dependece. An appointment CAN NOT exist without a Patient
    public readonly risk: HealthRiskEnum,
    public readonly isActive: boolean,
  ) {}
}

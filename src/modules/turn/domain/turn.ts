import { Patient } from './../../patient/domain/patient';

export enum RiskEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}
export class Turn {
  constructor(
    private readonly patient: Patient,
    private readonly startedAt: Date,
    private readonly risk: RiskEnum,
  ) {}

}

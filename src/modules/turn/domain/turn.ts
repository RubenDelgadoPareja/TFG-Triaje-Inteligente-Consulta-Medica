import { Patient } from './../../patient/domain/patient';
import { DateTime } from 'luxon';

export enum RiskEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}
export class Turn {
  private constructor(
    private readonly patient: Patient,
    private readonly startedAt: DateTime,
    private readonly risk: RiskEnum,
  ) {}

}

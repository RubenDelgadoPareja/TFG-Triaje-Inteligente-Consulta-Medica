import { Patient } from './patient';

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
    private readonly _priority: number,
  ) {}

  get priority(): number {
    return this._priority;
  }

}

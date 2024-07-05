
import { DateTime } from 'luxon';
import { Patient } from '../../patient/domain/patient';

export enum RiskEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export class Turn {
  constructor(
    private readonly queuePosition: number,
    // We will calculate the waiting time based on the startedAt and the current time
    private readonly startedAt: DateTime,
    private readonly patient: Patient,
    private readonly risk: RiskEnum,

  ){}

  getQueuePosition(): number {
    return this.queuePosition;
  }

  getPatient(): Patient {
    return this.patient;
  }

  getRisk(): RiskEnum {
    return this.risk;
  }

  getStartedAt(): DateTime {
    return this.startedAt;
  }

  getWaitingTime(): number {
    return DateTime.now().diff(this.startedAt, 'minutes').minutes;
  }

}

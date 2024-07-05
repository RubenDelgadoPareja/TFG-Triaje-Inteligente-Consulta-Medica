
import { DateTime } from 'luxon';

export interface TurnInputProps {
  id: number;
  patientId: number,
  position: number,
  startedAt: DateTime,
  risk: RiskEnum,
}

export enum RiskEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export class Turn {
  readonly __brand = "Turn" as const;

  private constructor(private readonly props: TurnInputProps) {}

  static create(props: TurnInputProps): Turn {
    return new Turn(props);
  }

  get id(): number {
    return this.props.id;
  }

  get patientId(): number {
    return this.props.patientId;
  }

  get position(): number {
    return this.position;
  }

  get startedAt(): DateTime {
    return this.startedAt;
  }

  get waitingTime(): number {
    return DateTime.now().diff(this.startedAt, 'minutes').minutes;
  }

  get risk(): RiskEnum {
    return this.risk;
  }
}

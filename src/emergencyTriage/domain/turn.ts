import { Patient } from './patient';

export enum RiskEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface TurnProps {
  patient: Patient;
  startedAt: Date;
  risk: RiskEnum;
  priority: number;
}

export class Turn {
  private readonly _props: TurnProps;

  constructor(props: TurnProps){
    this._props = props;
  }

  get patient(): Patient {
    return this._props.patient;
  }

  get startedAt(): Date {
    return this._props.startedAt;
  }

  get risk(): RiskEnum {
    return this._props.risk;
  }

  get priority(): number {
    return this._props.priority;
  }

}

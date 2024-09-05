
export enum RiskEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface TurnProps {
  id?: number;
  patientId: number;
  startedAt: Date;
  risk?: RiskEnum;
  priority: number;
}

export class Turn {
  private readonly _props: TurnProps;

  constructor(props: TurnProps){
    this._props = props;
  }

  get id(): number | undefined {
    return this._props.id;
  }

  get patientId(): number {
    return this._props.patientId;
  }

  get startedAt(): Date {
    return this._props.startedAt;
  }

  get risk(): RiskEnum | undefined{
    return this._props.risk;
  }

  get priority(): number {
    return this._props.priority;
  }

}

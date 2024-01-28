import { ValueObject } from '../../shared/domain/value-object';

export enum PatientRiskEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface PatientRiskProps {
  risk: PatientRiskEnum;
}

export class PatientRisk extends ValueObject<PatientRiskProps> {
  private constructor(props: PatientRiskProps) {
    super(props);
  }

  public static create(props: PatientRiskProps): PatientRisk {
    return new PatientRisk(props);
  }

  get key(): PatientRiskEnum {
    return this.props.risk;
  }

  get value(): string {
    return PatientRiskEnum[this.props.risk];
  }
}

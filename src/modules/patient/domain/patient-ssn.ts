import { ValueObject } from '../../shared/domain/value-object';

export interface PatientSsnProps {
  ssn: number;
}

// Es posible que el numero de la seguridad social se trate como un Identificador Unico de Paciente
export class PatientSsn extends ValueObject<PatientSsnProps> {
  public static readonly ssnRegex = /^[0-9]{12}$/;

  private constructor(props: PatientSsnProps) {
    super(props);
  }

  public static create(props: PatientSsnProps): PatientSsn {
    if (!PatientSsn.isValid(props.ssn)) {
      throw new Error(`Invalid SSN: ${props.ssn}`);
    }

    return new PatientSsn(props);
  }

  get value(): number {
    return this.props.ssn;
  }

  get valueString(): string {
    return this.props.ssn.toString();
  }

  static isValid(ssn: number): boolean {
    return this.ssnRegex.test(ssn.toString());
  }
}

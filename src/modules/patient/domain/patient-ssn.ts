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

  public static create(ssn: number): PatientSsn {
    if (!PatientSsn.isValid(ssn)) {
      throw new Error(`Invalid SSN: ${ssn}`);
    }

    return new PatientSsn({ ssn });
  }

  getValue(): number {
    return this.props.ssn;
  }

  getValueString(): string {
    return this.props.ssn.toString();
  }

  static isValid(ssn: number): boolean {
    return this.ssnRegex.test(ssn.toString());
  }
}

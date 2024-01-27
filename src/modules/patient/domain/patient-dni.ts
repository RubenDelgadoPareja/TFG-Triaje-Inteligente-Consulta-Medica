import { ValueObject } from '../../shared/domain/value-object';

export interface PatientDniProps {
  dni: string;
}

export class PatientDni extends ValueObject<PatientDniProps> {
  static readonly nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;

  constructor(params: PatientDniProps) {
    super(params);
  }

  public static create(dni: string): PatientDni {
    if (!PatientDni.isValid(dni)) {
      throw new Error(`Invalid DNI: ${dni}`);
    }

    return new PatientDni({ dni });
  }

  getValue(): string {
    return this.props.dni;
  }

  static isValid(dni: string): boolean {
    return this.nifRegex.test(dni);
  }
}

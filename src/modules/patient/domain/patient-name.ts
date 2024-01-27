import { ValueObject } from '../../shared/domain/value-object';

export interface PatientNameProps {
  name: string;
}

export class PatientName extends ValueObject<PatientNameProps> {
  public static minLength = 2;
  public static maxLength = 20;

  private constructor(props: PatientNameProps) {
    super(props);
  }

  public static create(name: string): PatientName {
    if (!PatientName.isValid(name)) {
      throw new Error(`Invalid name: ${name}`);
    }

    return new PatientName({ name });
  }

  getValue(): string {
    return this.props.name;
  }

  getValueString(): string {
    return this.props.name;
  }

  static isValid(name: string): boolean {
    return name.length > this.minLength && name.length <= this.maxLength;
  }
}

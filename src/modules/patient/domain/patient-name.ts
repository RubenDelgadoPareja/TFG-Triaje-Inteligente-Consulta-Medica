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

  public static create(props: PatientNameProps): PatientName {
    if (!PatientName.isValid(props.name)) {
      throw new Error(`Invalid name: ${props.name}`);
    }

    return new PatientName(props);
  }

  get value(): string {
    return this.props.name;
  }

  static isValid(name: string): boolean {
    return name.length > this.minLength && name.length <= this.maxLength;
  }
}

import { ValueObject } from '../../shared/domain/value-object';
export interface AppointmentDateProps {
  value: Date;
}

export class AppointmentDate extends ValueObject<AppointmentDateProps> {
  private constructor(props: AppointmentDateProps) {
    super(props);
  }

  public static create(props: AppointmentDateProps): AppointmentDate {
    return new AppointmentDate(props);
  }

  public value(): Date {
    return this.props.value;
  }
}

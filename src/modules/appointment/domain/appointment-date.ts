import { DateTime } from 'luxon';
import { ValueObject } from '../../shared/domain/value-object';

export interface AppointmentDateProps {
  date: DateTime;
}

export class AppointmentDate extends ValueObject<AppointmentDateProps> {
  // TODO: Add validation to the date, it should be beetween the doctor timetables and patient choices

  private constructor(props: AppointmentDateProps) {
    super(props);
  }

  public static create(props: AppointmentDateProps): AppointmentDate {
    return new AppointmentDate(props);
  }

  get value(): DateTime {
    return this.props.date;
  }

  get valueString(): string | null {
    return this.props.date.toISO();
  }
}

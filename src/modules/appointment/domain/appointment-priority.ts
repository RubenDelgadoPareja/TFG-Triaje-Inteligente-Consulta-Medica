import { ValueObject } from '../../shared/domain/value-object';
export interface AppointmentPriorityProps {
  priority: number;
}

export class AppointmentPriority extends ValueObject<AppointmentPriorityProps> {
  public static maxPrio = 10;
  public static minPrio = 1;

  private constructor(props: AppointmentPriorityProps) {
    super(props);
  }

  public static create(props: AppointmentPriorityProps): AppointmentPriority {
    if (!AppointmentPriority.isValid(props.priority)) {
      throw new Error(`The priority <${props.priority}> is invalid`);
    }
    return new AppointmentPriority(props);
  }

  get value(): number {
    return this.props.priority;
  }

  public static isValid(priority: number): boolean {
    return (
      priority >= AppointmentPriority.minPrio &&
      priority <= AppointmentPriority.maxPrio
    );
  }
}

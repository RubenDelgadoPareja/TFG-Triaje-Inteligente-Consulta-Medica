export interface AppointmentProps {
  id?: number;
}

export class Appointment {
  constructor(private readonly id?: number) {}

  public static create(props: AppointmentProps): Appointment {
    return new Appointment(props.id);
  }
}

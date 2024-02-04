import { Entity } from '../../shared/domain/entity';
import { UniqueEntityID } from '../../shared/domain/unique-entity-id';

export interface AppointmentProps {
  id: UniqueEntityID;
}

export class Appointment extends Entity<AppointmentProps> {
  constructor(props: AppointmentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: AppointmentProps,
    id?: UniqueEntityID,
  ): Appointment {
    return new Appointment(props, id);
  }
}

import { Entity } from '../../shared/domain/entity';
import { UniqueEntityID } from '../../shared/domain/unique-entity-id';
import { AppointmentId } from './appointment-id';

export interface AppointmentProps {
  id: AppointmentId;
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

import { Entity } from '../../shared/domain/entity';
import { UniqueEntityID } from '../../shared/domain/unique-entity-id';
import { AppointmentDate } from './appointment-date';
import { AppointmentType } from './appointment-type';

export interface AppointmentProps {
  id: UniqueEntityID;
  patientId: UniqueEntityID;
  appointmentDate: AppointmentDate;
  appointmentType: AppointmentType;
  confirmed?: boolean;
}

export class Appointment extends Entity<AppointmentProps> {
  constructor(props: AppointmentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: AppointmentProps,
    id?: UniqueEntityID,
  ): Appointment {
    props.confirmed = false;
    return new Appointment(props, id);
  }

  getDate(): AppointmentDate {
    return this.props.appointmentDate;
  }
}

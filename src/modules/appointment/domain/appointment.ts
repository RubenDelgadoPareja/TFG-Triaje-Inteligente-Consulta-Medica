import { Entity } from '../../shared/domain/entity';
import { UniqueEntityID } from '../../shared/domain/unique-entity-id';
import { AppointmentType } from './appointment-type';

export interface AppointmentProps {
  id: UniqueEntityID;
  patientId: UniqueEntityID;
  appointmentDate: Date;
  appointmentType: AppointmentType;
}

export class Appointment extends Entity<AppointmentProps> {
  constructor(props: AppointmentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  getDate(): Date {
    return this.props.appointmentDate;
  }
}

import { Entity } from '../../shared/domain/entity';
import { UniqueEntityID } from '../../shared/domain/unique-entity-id';
import { AppointmentDate } from './appointment-date';
import { AppointmentDescription } from './appointment-description';
import { AppointmentId } from './appointment-id';
import { AppointmentPriority } from './appointment-priority';

export interface AppointmentProps {
  id: AppointmentId;
  description: AppointmentDescription;
  date: AppointmentDate;
  priority: AppointmentPriority;
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

  get AppointmentId(): AppointmentId {
    return AppointmentId.create(this._id);
  }

  get AppointmentDescription(): AppointmentDescription {
    return this.props.description;
  }

  get AppointmentDate(): AppointmentDate {
    return this.props.date;
  }

  get AppointmentPriority(): AppointmentPriority {
    return this.props.priority;
  }
}

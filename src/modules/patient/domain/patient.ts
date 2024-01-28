import AggregateRoot from '../../shared/domain/aggregate-root';
import { UniqueEntityID } from '../../shared/domain/unique-entity-id';
import { PatientDni } from './patient-dni';
import { PatientId } from './patient-id';
import { PatientName } from './patient-name';
import { PatientRisk } from './patient-risk';
import { PatientSsn } from './patient-ssn';

interface PatientProps {
  id: PatientId; // Its possible we have to change it to UserId and create a module for Users
  ssn: PatientSsn;
  dni: PatientDni;
  name: PatientName;
  risk?: PatientRisk;
  Appointments?: unknown[]; // Array of ids of appointments. TODO: Change to AppointmentId Value Object when created
}

export class Patient extends AggregateRoot<PatientProps> {
  // We can pass an id to instantiate an already existing Patient
  constructor(props: PatientProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PatientProps, id?: UniqueEntityID): Patient {
    return new Patient(props, id);
  }

  get PatientId(): PatientId {
    return PatientId.create(this._id);
  }

  get name(): PatientName {
    return this.props.name;
  }

  get ssn(): PatientSsn {
    return this.props.ssn;
  }

  get dni(): PatientDni {
    return this.props.dni;
  }

  get risk(): PatientRisk | undefined {
    return this.props.risk;
  }

  public updateRisk(risk: PatientRisk): void {
    this.props.risk = risk;
  }
}

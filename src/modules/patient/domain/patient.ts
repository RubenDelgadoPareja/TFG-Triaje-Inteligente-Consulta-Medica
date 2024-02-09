import AggregateRoot from '../../shared/domain/aggregate-root';
import { UniqueEntityID } from '../../shared/domain/unique-entity-id';

interface PatientProps {
  id: UniqueEntityID;
}

export class Patient extends AggregateRoot<PatientProps> {
  // We can pass an id to instantiate an already existing Patient
  constructor(props: PatientProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PatientProps, id?: UniqueEntityID): Patient {
    return new Patient(props, id);
  }
}

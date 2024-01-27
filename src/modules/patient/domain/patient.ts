import AggregateRoot from '../../shared/domain/aggregate-root';
import { PatientDni } from './patient-dni';
import { PatientId } from './patient-id';
import { PatientSsn } from './patient-ssn';

interface PatientProps {
  id: PatientId;
  ssn: PatientSsn;
  dni: PatientDni;
}

export class Patient extends AggregateRoot<PatientProps> {
  constructor(props: PatientProps) {
    super(props);
  }
}

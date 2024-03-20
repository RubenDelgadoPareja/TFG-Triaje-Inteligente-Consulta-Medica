interface PatientProps {
  id?: number;
}

export class Patient {
  // We can pass an id to instantiate an already existing Patient
  constructor(private readonly id?: number) {}

  public static create(props: PatientProps): Patient {
    return new Patient(props.id);
  }
}

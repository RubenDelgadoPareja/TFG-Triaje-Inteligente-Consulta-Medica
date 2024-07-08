export interface PatientInputProps{
  name: string;
  dni: string;
  turn: unknown;
  symptomForm: unknown;
}

export class Patient {
  readonly __brand = "Patient" as const;

  private constructor(private readonly props: PatientInputProps) {}

  static create(props: PatientInputProps): Patient {
    // TODO: Create custom error message for invalid patient creation
    return new Patient(props);
  }
}

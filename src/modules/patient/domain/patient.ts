export interface PatientInputProps{
  id: number;
  name: string;
  dni: string;
  ssc: string;
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

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get dni(): string {
    return this.props.dni;
  }

  get ssc(): string {
    return this.props.ssc;
  }

  get turn(): unknown {
    return this.props.turn;
  }

  get symptomForm(): unknown {
    return this.props.symptomForm;
  }
}

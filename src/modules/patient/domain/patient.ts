export enum PatientRisk {
  UNKNOWN = 'unknown',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum Delay {
  IMMEDIATELY = 'immediately',
  FIFTEEN_MINUTES = '15 minutes',
  SIXTY_MINUTES = '60 minutes',
  ONE_HUNDRED_TWENTY_MINUTES = '120 minutes',
  TWO_HUNDERED_FOURTY_MINUTES = '240 minutes',
}

export class Patient {
  constructor(
    public readonly name: string,
    public readonly dni: string,
    public readonly ssc: string,
    public readonly risk: PatientRisk,
    public readonly delay: Delay,
    // TODO: Create issue and implement the triage form model
    public readonly triageForm: unknown,
  ) {}

  getName(): string {
    return this.name;
  }

  getDni(): string {
    return this.dni;
  }

  getSsc(): string {
    return this.ssc;
  }

  getRisk(): PatientRisk {
    return this.risk;
  }

  getDelay(): Delay {
    return this.delay;
  }

  getTriageForm(): unknown {
    return this.triageForm;
  }
}

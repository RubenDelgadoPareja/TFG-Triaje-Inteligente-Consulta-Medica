export enum PatientRisk {
  UNKNOWN = 'unknown',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
export class Patient {
  constructor(
    public readonly name: string,
    public readonly dni: string,
    public readonly ssc: string,
    public readonly risk: PatientRisk,
    public readonly delay: number,
    public readonly triageForm: unknown,
    public readonly queuePosition: number,
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

  getDelay(): number {
    return this.delay;
  }

  getTriageForm(): unknown {
    return this.triageForm;
  }

  getQueuePosition(): number {
    return this.queuePosition;
  }
}

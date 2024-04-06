export enum PatientGenre {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum PatientRisk {
  UNKNOWN = 'unknown',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class Patient {
  constructor(
    public readonly risk: PatientRisk,
    public readonly name: string,
    public readonly birthDate: Date,
    public readonly dni: string,
    public readonly ssc: string,
    public readonly genre: PatientGenre,
    public readonly email: string,
    public readonly phone: string,
  ) {}

  getRisk(): PatientRisk {
    return this.risk;
  }

  getName(): string {
    return this.name;
  }

  getBirthDate(): Date {
    return this.birthDate;
  }

  getDni(): string {
    return this.dni;
  }

  getSsc(): string {
    return this.ssc;
  }

  getGenre(): PatientGenre {
    return this.genre;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }
}

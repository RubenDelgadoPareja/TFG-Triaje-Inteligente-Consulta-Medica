
export class Patient {
  constructor(
    public readonly name: string,
    public readonly dni: string,
    public readonly ssc: string,
    // TODO: Create issue and implement the turn model
    public readonly turn: unknown,
    // TODO: Create issue and implement the symptom form model
    public readonly symptomForm: unknown,
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

  getRisk(): unknown {
    return this.turn;
  }

  getTriageForm(): unknown {
    return this.symptomForm;
  }
}

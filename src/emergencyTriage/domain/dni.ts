
export class Dni {
    private readonly _value: string;

    constructor(value: string){
        if (!this.isValid(value)) {
            throw new Error('Invalid DNI format');
        }
        this._value = value;
    }

    get value(): string {
        return this._value;
    }

    isValid(value: string): boolean {
    const dniRegex = /^\d{8}[A-HJ-NP-TV-Z]$/;
    return dniRegex.test(value);
  }
}

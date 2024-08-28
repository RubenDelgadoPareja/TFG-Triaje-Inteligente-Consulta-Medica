
export class Dni {
    private readonly _value: string;

    constructor(value: string){
        this._value = value;
        if (!this.isValid()) {
            throw new Error('Invalid DNI format');
        }
    }

    get value(): string {
        return this._value;
    }

    isValid(): boolean {
    const dniRegex = /^\d{8}[A-HJ-NP-TV-Z]$/;
    return dniRegex.test(this.value);
  }
}

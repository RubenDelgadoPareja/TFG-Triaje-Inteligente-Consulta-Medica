
export interface SymptomsFormInputProps {
    id: number;
    patientId: number;
    reason: string;
    // TODO: Change to enum
    discriminatory: string;
    symptoms: string;
    // TODO: Define the type of vitalSigns
    vitalSigns: unknown;
    diagnosis: string;
}

export class SymptomsForm {
    readonly __brand = "SymptomsForm" as const;

    private constructor(private readonly props: SymptomsFormInputProps) {}

    static create(props: SymptomsFormInputProps): SymptomsForm {
        return new SymptomsForm(props);
    }

    get id(): number {
        return this.props.id;
    }

    get pratientId(): number {
        return this.props.patientId;
    }

    get reason(): string {
        return this.props.reason;
    }

    get discriminatory(): string {
        return this.props.discriminatory;
    }

    get symptoms(): string {
        return this.props.symptoms;
    }

    get vitalSigns(): unknown {
        return this.props.vitalSigns;
    }

    get diagnosis(): string {
        return this.props.diagnosis;
    }

}

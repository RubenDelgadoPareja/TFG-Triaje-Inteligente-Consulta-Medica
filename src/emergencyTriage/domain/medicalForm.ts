
export interface MedicalFormProps {
    id?: number;
    patientId: number;
    reason: string;
    discriminators: string;
    symptoms: string;
    vitalSigns: string;
    diagnosis: string;
}

export class MedicalForm {
    private props: MedicalFormProps;

    constructor(
        props: MedicalFormProps
    ) {
        this.props = props;
    }

    get id(): number | undefined {
        return this.props.id;
    }

    get patientId(): number {
        return this.props.patientId;
    }

    get reason(): string {
        return this.props.reason;
    }

    get discriminators(): string {
        return this.props.discriminators;
    }

    get symptoms(): string {
        return this.props.symptoms;
    }

    get vitalSigns(): string {
        return this.props.vitalSigns;
    }

    get diagnosis(): string {
        return this.props.diagnosis;
    }
}

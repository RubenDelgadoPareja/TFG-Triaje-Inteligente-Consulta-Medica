import { Patient } from "./patient";

export interface MedicalFormProps {
    patient: Patient;
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

    get patient(): Patient {
        return this.props.patient;
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

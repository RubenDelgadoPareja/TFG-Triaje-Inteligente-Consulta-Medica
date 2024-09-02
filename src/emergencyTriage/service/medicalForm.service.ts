import { Injectable } from "@nestjs/common";
import { MedicalForm, MedicalFormProps } from "../domain/medicalForm";

@Injectable()
export class MedicalFormService {
    constructor() {}

    createMedicalForm(props: MedicalFormProps): MedicalForm{
        return new MedicalForm({
            patientId: props.patientId,
            reason: props.reason,
            discriminators: props.discriminators,
            symptoms: props.symptoms,
            vitalSigns: props.vitalSigns,
            diagnosis: props.diagnosis
        });
    }
}

import { faker } from "@faker-js/faker";
import { MedicalForm, MedicalFormProps } from "../domain/medicalForm";


export const getMedicalForm = (
    id?: number, patientId?: number, reason?: string, discriminators?: string, symptoms?: string, vitalSigns?: string, diagnosis?: string
): MedicalForm => {
    const medicalFormProps: MedicalFormProps = {
        id: id ?? undefined,
        patientId: patientId ?? faker.number.int(),
        reason: reason ?? faker.lorem.sentence(),
        discriminators: discriminators ?? faker.lorem.sentence(),
        symptoms: symptoms ?? faker.lorem.sentence(),
        vitalSigns: vitalSigns ?? faker.lorem.sentence(),
        diagnosis: diagnosis ?? faker.lorem.sentence()
    }

    return new MedicalForm(medicalFormProps);
}

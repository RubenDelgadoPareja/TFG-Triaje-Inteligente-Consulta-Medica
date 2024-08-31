import { faker } from "@faker-js/faker";
import { MedicalForm, MedicalFormProps } from "../domain/medicalForm";
import { Patient } from "../domain/patient";
import { getPatient } from "./getPatient.mock";


export const getMedicalForm = (
    patient?: Patient, reason?: string, discriminators?: string, symptoms?: string, vitalSigns?: string, diagnosis?: string
): MedicalForm => {
    const medicalFormProps: MedicalFormProps = {
        patient: patient ?? getPatient(),
        reason: reason ?? faker.lorem.sentence(),
        discriminators: discriminators ?? faker.lorem.sentence(),
        symptoms: symptoms ?? faker.lorem.sentence(),
        vitalSigns: vitalSigns ?? faker.lorem.sentence(),
        diagnosis: diagnosis ?? faker.lorem.sentence()
    }

    return new MedicalForm(medicalFormProps);
}

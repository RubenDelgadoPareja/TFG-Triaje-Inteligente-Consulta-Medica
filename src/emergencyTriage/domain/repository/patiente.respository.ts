import { Patient } from "../model/patient";

export interface PatientRepository {
    create: (patient: Patient) => Promise<Patient>;
}

import { Patient } from "../model/patient";

export interface PatientRepository {
    create: (name: string, dni: string) => Promise<Patient>;
}

import { Patient } from "../model/patient";

export interface IPatientRepository {
    create: (name: string, dni: string) => Promise<Patient>;
}

import { Patient } from "../domain/model/patient";
export class PatientServices {
  constructor() {}

  async create(name: string, dni: string): Promise<Patient> {
    return new Patient(name, dni);
  }
}

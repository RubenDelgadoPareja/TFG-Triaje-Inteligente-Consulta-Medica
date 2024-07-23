import { Patient } from "../domain/model/patient";
import { PatientRepository } from "./patient.repository";

export class PatientServices {
  constructor(readonly patientRepository: PatientRepository) {}

  async create(name: string, dni: string): Promise<Patient> {
    return this.patientRepository.create(name, dni);
  }
}

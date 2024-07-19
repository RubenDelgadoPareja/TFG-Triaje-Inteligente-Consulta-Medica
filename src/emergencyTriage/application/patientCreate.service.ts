import { Patient } from "../domain/model/patient";
import { PatientRepository } from "../domain/repository/patiente.respository";

export class PatientCreate {
  constructor(readonly patientRepository: PatientRepository) {}

  async execute(name: string, dni: string): Promise<void> {
    const patient = new Patient(name, dni);

    return this.patientRepository.create(patient);
  }
}

import { Patient } from '../domain/model/patient';
import { IPatientRepository } from '../domain/repository/patiente.interface.respository';

export class PatientRepository implements IPatientRepository {
  constructor() {}

  async create(name: string, dni: string): Promise<Patient> {
    return new Patient(name, dni);
  }
}

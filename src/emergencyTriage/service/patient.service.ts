import { Injectable } from "@nestjs/common";
import { PatientProps, Patient } from "../domain/patient";
import { PatientMapper } from "../mapper/patient.mapper";
import { PatientRepository } from "../infrastructure/repository/patient.repository";

@Injectable()
export class PatientService {
    constructor(
        private readonly patientMapper: PatientMapper,
        private readonly patientRepository: PatientRepository
    ) {}

    async createPatient(props: PatientProps): Promise<Patient>{

        const patientEntity = this.patientMapper.mapPatientPropsToEntity(props);
        const patientResult  = await this.patientRepository.createPatient(patientEntity);
        return this.patientMapper.mapPatientEntityToDomain(patientResult);
    }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { PatientProps, Patient } from "../domain/patient";
import { PatientMapper } from "../mapper/patient.mapper";
import { PatientRepository } from "../infrastructure/repository/patient.repository";

@Injectable()
export class PatientService {
    constructor(
        private readonly patientMapper: PatientMapper,
        private readonly patientRepository: PatientRepository
    ) {}

    async findAll(): Promise<Patient[]> {
        const patientEntities = await this.patientRepository.getAll();
        return patientEntities.map(patientEntity => this.patientMapper.mapPatientEntityToDomain(patientEntity));
    }

    async findOne(id: number): Promise<Patient> {
        const patientEntity = await this.patientRepository.getPatientById(id);
        if (!patientEntity) {
            throw new NotFoundException(`Patient with ID ${id} not found`);
        }
        return this.patientMapper.mapPatientEntityToDomain(patientEntity);
    }

    async createPatient(props: PatientProps): Promise<Patient>{

        const patientEntity = this.patientMapper.mapPatientPropsToEntity(props);
        const patientResult  = await this.patientRepository.createPatient(patientEntity);
        return this.patientMapper.mapPatientEntityToDomain(patientResult);
    }

    async update(id: number, props: PatientProps): Promise<Patient> {
        const existingPatient = await this.patientRepository.getPatientById(id);
        if (!existingPatient) {
            throw new NotFoundException(`Patient with ID ${id} not found`);
        }

        const updatedPatientEntity = this.patientMapper.mapPatientPropsToEntity({ ...props, id });
        const updatedPatient = await this.patientRepository.updatePatient(id, updatedPatientEntity);
        return this.patientMapper.mapPatientEntityToDomain(updatedPatient);
    }

    async remove(id: number): Promise<void> {
        const existingPatient = await this.patientRepository.getPatientById(id);
        if (!existingPatient) {
            throw new NotFoundException(`Patient with ID ${id} not found`);
        }
        await this.patientRepository.removePatient(id);
    }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { MedicalForm, MedicalFormProps } from "../domain/medicalForm";
import { MedicalFormMapper } from "../mapper/medicalForm.mapper";
import { MedicalFormRepository } from "../infrastructure/repository/medicalForm.repository";
import { PatientRepository } from "../infrastructure/repository/patient.repository";

@Injectable()
export class MedicalFormService {
    constructor(
        private readonly medicalFormMapper: MedicalFormMapper,
        private readonly medicalFormRepository: MedicalFormRepository,
        private readonly patientRepository: PatientRepository,
    ) {}

    async findAll(): Promise<MedicalForm[]> {
        const medicalFormEntities = await this.medicalFormRepository.getAll();
        return medicalFormEntities.map(medicalFormEntity => this.medicalFormMapper.mapMedicalFormEntityToDomain(medicalFormEntity));
    }

    async findOne(id: number): Promise<MedicalForm> {
        const medicalFormEntity = await this.medicalFormRepository.getMedicalFormById(id);
        if (!medicalFormEntity) {
            throw new NotFoundException(`Medical form with ID ${id} not found`);
        }
        return this.medicalFormMapper.mapMedicalFormEntityToDomain(medicalFormEntity);
    }

    async createMedicalForm(props: MedicalFormProps): Promise<MedicalForm> {
        const patientEntity = await this.patientRepository.getPatientById(props.patientId);
        if (!patientEntity) {
            throw new NotFoundException(`Patient with ID ${props.patientId} not found`);
        }
        const medicalFormEntity = this.medicalFormMapper.mapMedicalFormPropsToEntity(props, patientEntity);
        const medicalFormResult = await this.medicalFormRepository.createMedicalForm(medicalFormEntity);
        return this.medicalFormMapper.mapMedicalFormEntityToDomain(medicalFormResult);
    }

    async updateMedicalForm(id: number, props: MedicalFormProps): Promise<MedicalForm> {
        const existingMedicalForm = await this.medicalFormRepository.getMedicalFormById(id);
        if (!existingMedicalForm) {
            throw new NotFoundException(`Medical form with ID ${id} not found`);
        }
        const patientEntity = await this.patientRepository.getPatientById(props.patientId);
        if (!patientEntity) {
            throw new NotFoundException(`Patient with ID ${props.patientId} not found`);
        }
        const medicalFormEntity = this.medicalFormMapper.mapMedicalFormPropsToEntity(props, patientEntity);
        const updatedMedicalFormEntity = await this.medicalFormRepository.updateMedicalForm(id, medicalFormEntity);
        return this.medicalFormMapper.mapMedicalFormEntityToDomain(updatedMedicalFormEntity);
    }

    async removeMedicalForm(id: number): Promise<void> {
        return await this.medicalFormRepository.removeMedicalForm(id);
    }
}

import { Repository } from 'typeorm';
import { MedicalFormEntity } from '../orm/medicalForm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientRepository } from './patient.repository';
import { NotFoundException, ConflictException } from '@nestjs/common';

export class MedicalFormRepository extends Repository<MedicalFormEntity> {
    constructor(
        @InjectRepository(MedicalFormEntity)
        private readonly repository: Repository<MedicalFormEntity>,
        private readonly patientRepository: PatientRepository,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async getAll(): Promise<MedicalFormEntity[]> {
        return await this.repository.find({
            relations: ['patient'],
        });
    }

    async getMedicalFormById(medicalFormId: number): Promise<MedicalFormEntity> {
        const medicalForm = await this.repository.findOne({
            where: { id:  medicalFormId},
            relations: ['patient'],
        });

        if (!medicalForm) {
            throw new NotFoundException(`Medical form with ID ${medicalFormId} not found`);
        }

        return medicalForm;
    }

    async createMedicalForm(medicalForm: MedicalFormEntity): Promise<MedicalFormEntity> {
        // Verificar si el paciente existe
        const patient = await this.patientRepository.getPatientById(medicalForm.patient.id);
        if (!patient) {
            throw new NotFoundException(`Patient with ID ${medicalForm.patient.id} does not exist`);
        }

        if(medicalForm.id){
        const existingMedicalForm = await this.repository.findOne({
            where: {
            id: medicalForm.id,
            },
        });

        if (existingMedicalForm) {
            throw new ConflictException(`Medical form with ID ${medicalForm.id} already exists`);
        }}

        // Guardar el nuevo formulario médico
        return await this.repository.save(medicalForm);
    }

    async updateMedicalForm(medicalFormId: number, medicalForm: MedicalFormEntity): Promise<MedicalFormEntity> {
        // Buscar el formulario médico para actualizar
        const existingMedicalForm = await this.getMedicalFormById(medicalFormId);

        if (!existingMedicalForm) {
            throw new NotFoundException(`Medical form with ID ${medicalFormId} not found`);
        }

        // Verificar si el paciente existe
        const patient = await this.patientRepository.getPatientById(medicalForm.patient.id);
        if (!patient) {
            throw new NotFoundException(`Patient with ID ${medicalForm.patient.id} does not exist`);
        }

        // Actualizar el formulario médico
        await this.repository.update(medicalFormId, medicalForm);

        // Retornar el formulario médico actualizado
        return this.getMedicalFormById(medicalFormId);
    }

    async removeMedicalForm(medicalFormId: number): Promise<void> {
        const result = await this.repository.delete(medicalFormId);

        if (result.affected === 0) {
            throw new NotFoundException(`Medical form with ID ${medicalFormId} not found`);
        }
    }
}

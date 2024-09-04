import { Repository } from "typeorm";
import { MedicalFormEntity } from "../orm/medicalForm.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PatientRepository } from "./patient.repository";
import { NotFoundException } from "@nestjs/common";


export class MedicalFormRepository extends Repository<MedicalFormEntity> {
    constructor(
        @InjectRepository(MedicalFormEntity)
        private readonly repository: Repository<MedicalFormEntity>,
        private readonly patientRepository: PatientRepository,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async getMedicalFormById(medicalFormId: number): Promise<MedicalFormEntity> {
        const medicalForm = await this.repository.findOne({ where: { id: medicalFormId } });

        if (!medicalForm) {
            throw new NotFoundException(`Medical form with ID ${medicalFormId} not found`);
        }

        return medicalForm;
    }

    async createMedicalForm(medicalForm: MedicalFormEntity): Promise<MedicalFormEntity> {
        // Verificar si el paciente existe
        const patient = await this.patientRepository.getPatientById(medicalForm.patient.id);
        if (!patient) {
          throw new NotFoundException(`Patient with ID ${medicalForm.patient.id} not found`);
        }

        const existingMedicalForm = await this.repository.findOne({
            where: {
                patient: medicalForm.patient,
            },
        });

        if(existingMedicalForm){
            throw new NotFoundException(`Medical form for patient with ID ${medicalForm.id} already exists`);
        }

        // Guardar el formulario médico en la base de datos
        return await this.repository.save(medicalForm);
      }
}

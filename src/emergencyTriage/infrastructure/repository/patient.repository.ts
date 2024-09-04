import { PatientEntity } from "../orm/patient.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConflictException, NotFoundException } from "@nestjs/common";

export class PatientRepository extends Repository<PatientEntity> {
    constructor(
        @InjectRepository(PatientEntity)
        private readonly repository: Repository<PatientEntity>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async getAll(): Promise<PatientEntity[]>{
        return await this.repository.find();
    }

    async getPatientById(patientId: number): Promise<PatientEntity> {
        const patient = await this.repository.findOne({ where: { id: patientId } });

        if (!patient) {
          throw new NotFoundException(`Patient with ID ${patientId} not found`);
        }

        return patient;
      }

    async createPatient(patient: PatientEntity): Promise<PatientEntity> {
        const existingPatient = await this.repository.findOne({
            where: [
                { id: patient.id },   // Verifica por ID
                { dni: patient.dni }   // Verifica por DNI
            ]
        });

        if (existingPatient) {
            throw new ConflictException('A patient with this ID or DNI already exists');
        }
        return await this.repository.save(patient);
    }

    async updatePatient(patientId: number, patient: PatientEntity): Promise<PatientEntity>{
        const existingPatient = await this.getPatientById(patientId);

        if(!existingPatient){
            throw new NotFoundException(`Patient with ID ${patientId} not found`);
        }

        await this.repository.update(patientId, patient);

        const patientEdited = await this.getPatientById(patientId);
        if(!patientEdited){
            throw new NotFoundException(`Patient with ID ${patientId} not found`);
        }
        return patientEdited;
    }

    async removePatient(patientId: number): Promise<void> {
        const result = await this.repository.delete(patientId);

        if (result.affected === 0) {
            throw new NotFoundException(`Patient with ID ${patientId} not found`);
        }
    }
}


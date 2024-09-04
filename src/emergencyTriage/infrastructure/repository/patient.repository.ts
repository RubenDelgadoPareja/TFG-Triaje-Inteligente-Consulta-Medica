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
}


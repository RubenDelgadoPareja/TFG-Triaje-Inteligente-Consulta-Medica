import { PatientEntity } from "../orm/patient.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConflictException } from "@nestjs/common";

export class PatientRepository extends Repository<PatientEntity> {
    constructor(
        @InjectRepository(PatientEntity)
        private readonly repository: Repository<PatientEntity>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
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


import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from "../controller/patient.controller";
import { PatientMapper } from "../mapper/patient.mapper";
import { PatientService } from "../service/patient.service";
import { PatientEntity } from "../infrastructure/orm/patient.entity";
import { PatientRepository } from "../infrastructure/repository/patient.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([PatientEntity]),
      ],
    controllers: [PatientController],
    providers: [PatientService, PatientMapper, PatientRepository],
    exports: [PatientService, PatientMapper, PatientRepository]
})
export class PatientModule {}

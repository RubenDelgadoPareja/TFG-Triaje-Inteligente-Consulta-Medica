import { Module } from "@nestjs/common";
import { MedicalFormController } from "../controller/medicalForm.controller";
import { MedicalFormService } from "../service/medicalForm.service";
import { MedicalFormMapper } from "../mapper/medicalForm.mapper";
import { MedicalFormRepository } from "../infrastructure/repository/medicalForm.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MedicalFormEntity } from "../infrastructure/orm/medicalForm.entity";
import { PatientModule } from "./patient.module";


@Module({
    imports:  [TypeOrmModule.forFeature([MedicalFormEntity]), PatientModule],
    controllers: [MedicalFormController],
    providers: [MedicalFormService, MedicalFormMapper, MedicalFormRepository],
    exports: [MedicalFormService, MedicalFormMapper]
})
export class MedicalFormModule {}

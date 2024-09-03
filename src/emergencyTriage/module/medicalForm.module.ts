import { Module } from "@nestjs/common";
import { MedicalFormController } from "../controller/medicarForm.controller";
import { MedicalFormService } from "../service/medicalForm.service";
import { MedicalFormMapper } from "../mapper/medicalForm.mapper";


@Module({
    controllers: [MedicalFormController],
    providers: [MedicalFormService, MedicalFormMapper],
    exports: [MedicalFormService, MedicalFormMapper]
})
export class MedicalFormModule {}

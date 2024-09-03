import { Module } from "@nestjs/common";
import { PatientController } from "../controller/patient.controller";
import { PatientMapper } from "../mapper/patient.mapper";
import { PatientService } from "../service/patient.service";

@Module({
    controllers: [PatientController],
    providers: [PatientService, PatientMapper],
    exports: [PatientService, PatientMapper]
})
export class PatientModule {}

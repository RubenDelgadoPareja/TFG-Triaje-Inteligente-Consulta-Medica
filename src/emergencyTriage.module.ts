import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EmergencyTriageController } from "./emergencyTriage/emergencyTriage.controller";
import { EmergencyTriageService } from "./emergencyTriage/emergencyTriage.service";
import { PatientModule } from "./emergencyTriage/module/patient.module";
import { MedicalFormModule } from "./emergencyTriage/module/medicalForm.module";
import { TurnModule } from "./emergencyTriage/module/turn.module";
import { TriageQueueService } from "./emergencyTriage/service/triageQueue.service";
import { PatientController } from "./emergencyTriage/controller/patient.controller";
import { MedicalFormController } from "./emergencyTriage/controller/medicarForm.controller";
import { TurnController } from "./emergencyTriage/controller/turn.controller";


@Module({
    imports: [ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            PatientModule,
            MedicalFormModule,
            TurnModule,
        ],
    controllers: [EmergencyTriageController, PatientController, MedicalFormController, TurnController],
    providers: [EmergencyTriageService, TriageQueueService]
})
export class EmergencyTriageModule {}

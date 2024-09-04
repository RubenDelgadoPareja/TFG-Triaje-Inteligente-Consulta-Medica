import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EmergencyTriageController } from "./emergencyTriage/emergencyTriage.controller";
import { EmergencyTriageService } from "./emergencyTriage/emergencyTriage.service";
import { PatientModule } from "./emergencyTriage/module/patient.module";
import { MedicalFormModule } from "./emergencyTriage/module/medicalForm.module";
import { TurnModule } from "./emergencyTriage/module/turn.module";
import { TriageQueueService } from "./emergencyTriage/service/triageQueue.service";
import { PatientController } from "./emergencyTriage/controller/patient.controller";
import { MedicalFormController } from "./emergencyTriage/controller/medicalForm.controller";
import { TurnController } from "./emergencyTriage/controller/turn.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { PatientEntity } from "./emergencyTriage/infrastructure/orm/patient.entity";
import { TurnEntity } from "./emergencyTriage/infrastructure/orm/turn.entity";
import { MedicalFormEntity } from "./emergencyTriage/infrastructure/orm/medicalForm.entity";


@Module({
    imports: [
            ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            TypeOrmModule.forRoot({
                type: process.env.DB_TYPE as 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '5432', 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [PatientEntity, MedicalFormEntity, TurnEntity],
                synchronize: true, // Only in dev, not production
              }),
            PatientModule,
            MedicalFormModule,
            TurnModule,
        ],
    controllers: [EmergencyTriageController, PatientController, MedicalFormController, TurnController],
    providers: [EmergencyTriageService, TriageQueueService]
})
export class EmergencyTriageModule {
    constructor(private dataSource: DataSource) {}
}

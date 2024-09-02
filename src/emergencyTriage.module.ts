import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EmergencyTriageController } from "./emergencyTriage/emergencyTriage.controller";
import { EmergencyTriageService } from "./emergencyTriage/emergencyTriage.service";


@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
    }), ],
    controllers: [EmergencyTriageController],
    providers: [EmergencyTriageService]
})
export class EmergencyTriageModule {}

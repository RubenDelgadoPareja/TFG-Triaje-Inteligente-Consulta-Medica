import { Controller, Get } from "@nestjs/common";
import { EmergencyTriageService } from "./emergencyTriage.service";


@Controller('emergency-triage')
export class EmergencyTriageController {
    constructor(
        private readonly emergencyTriageService: EmergencyTriageService
    ) {}

    @Get()
    getEmergencyTriageMessage(): string {
        return this.emergencyTriageService.getEmergencyTriageMessage();
    }
}

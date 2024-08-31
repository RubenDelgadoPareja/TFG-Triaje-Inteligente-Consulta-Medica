import { Injectable } from "@nestjs/common";

@Injectable()
export class EmergencyTriageService {
    getEmergencyTriageMessage(): string {
        return 'Emergency Triage';
    }
}

import { Injectable } from "@nestjs/common";
import { TriageQueueService } from "./service/triageQueue.service";
import { PatientService } from "./service/patient.service";
import { MedicalFormService } from "./service/medicalForm.service";
import { TurnService } from "./service/turn.service";
import { getPatient } from './mocks/getPatient.mock';
import { getTurn } from './mocks/getTurn.mock';
import { getMedicalForm } from './mocks/getMedicalForm.mock';

@Injectable()
export class EmergencyTriageService {
    constructor(
        private readonly patientService: PatientService,
        private readonly medicalFormService: MedicalFormService,
        private readonly turnService: TurnService,
        private readonly triageQueueService: TriageQueueService
    ){}

    getEmergencyTriageMessage(): string {
        return 'Emergency Triage';
    }

    async createEmergencyTriage(){
        // New patient arrives the emergency room
        const patient = await this.patientService.createPatient(getPatient(1));

        // The patient fills out the medical form
        const medicalForm = await this.medicalFormService.createMedicalForm(getMedicalForm(1, patient.id));

        const priority = this.turnService.estimatePriority(medicalForm);
        // The patient is assigned a turn
        const turn = await this.turnService.createTurn(getTurn(1, patient.id, priority));

        // The patient is added to the triage queue
        const triageQueue = this.triageQueueService.instanceTriageQueue();
        triageQueue.addTurnToQueue(turn);
    }
}

import { Patient } from './domain/patient';
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

    createEmergencyTriage(){
        // New patient arrives the emergency room
        const patient = this.patientService.createPatient(getPatient());

        // The patient fills out the medical form
        const medicalForm = this.medicalFormService.createMedicalForm(getMedicalForm(patient));
        // The patient is assigned a turn
        const turn = this.turnService.createTurn(getTurn(patient));

        // The patient is added to the triage queue
        const triageQueue = this.triageQueueService.instanceTriageQueue();
        triageQueue.addTurnToQueue(turn);
    }
}

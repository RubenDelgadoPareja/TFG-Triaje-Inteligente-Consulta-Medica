import { TurnService } from './service/turn.service';
import { PatientService } from './service/patient.service';
import { EmergencyTriageController } from "./emergencyTriage.controller";
import { EmergencyTriageService } from "./emergencyTriage.service";
import { MedicalFormService } from './service/medicalForm.service';
import { TriageQueueService } from './service/triageQueue.service';


describe('Emergency Triage Controller', () => {
    let patientService: PatientService;
    let medicalFormService: MedicalFormService;
    let turnService: TurnService;
    let triageQueueService: TriageQueueService;
    let emergencyTriageController: EmergencyTriageController;
    let emergencyTriageService: EmergencyTriageService;

    beforeEach(() => {
        patientService = new PatientService();
        medicalFormService = new MedicalFormService();
        turnService = new TurnService();
        triageQueueService = new TriageQueueService();
        emergencyTriageService = new EmergencyTriageService(patientService, medicalFormService, turnService, triageQueueService);
        emergencyTriageController = new EmergencyTriageController(emergencyTriageService);
    });

    describe('getEmergencyTriageMessage', () => {
        it('should return a message', () => {
            const result = 'Emergency Triage';
            jest.spyOn(emergencyTriageService, 'getEmergencyTriageMessage').mockImplementation(() => result);

            expect(emergencyTriageController.getEmergencyTriageMessage()).toBe(result);
        });
    });

});

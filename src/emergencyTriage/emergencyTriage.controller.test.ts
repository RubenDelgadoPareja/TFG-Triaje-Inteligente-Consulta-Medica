import { TurnRepository } from './infrastructure/repository/turn.repository';
import { TurnMapper } from './mapper/turn.mapper';
import { MedicalFormRepository } from './infrastructure/repository/medicalForm.repository';
import { PatientMapper } from './mapper/patient.mapper';
import { TurnService } from './service/turn.service';
import { PatientService } from './service/patient.service';
import { EmergencyTriageController } from "./emergencyTriage.controller";
import { EmergencyTriageService } from "./emergencyTriage.service";
import { MedicalFormService } from './service/medicalForm.service';
import { TriageQueueService } from './service/triageQueue.service';
import { PatientRepository } from './infrastructure/repository/patient.repository';
import { MedicalFormMapper } from './mapper/medicalForm.mapper';


describe('Emergency Triage Controller', () => {
    let patientMapper: PatientMapper;
    let patientRepository: PatientRepository
    let patientService: PatientService;
    let medicalFormMapper: MedicalFormMapper;
    let MedicalFormRepository: MedicalFormRepository;
    let medicalFormService: MedicalFormService;
    let turnMapper: TurnMapper;
    let turnRepository: TurnRepository;
    let turnService: TurnService;
    let triageQueueService: TriageQueueService;
    let emergencyTriageController: EmergencyTriageController;
    let emergencyTriageService: EmergencyTriageService;

    beforeEach(() => {
        patientMapper = new PatientMapper();
        patientService = new PatientService(patientMapper, patientRepository);
        medicalFormMapper = new MedicalFormMapper();
        medicalFormService = new MedicalFormService(medicalFormMapper, MedicalFormRepository, patientRepository);
        turnMapper = new TurnMapper();
        turnService = new TurnService(turnMapper, turnRepository, patientRepository);
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

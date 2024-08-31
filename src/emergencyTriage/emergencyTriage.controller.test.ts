import { EmergencyTriageController } from "./emergencyTriage.controller";
import { EmergencyTriageService } from "./emergencyTriage.service";


describe('Emergency Triage Controller', () => {
    let emergencyTriageController: EmergencyTriageController;
    let emergencyTriageService: EmergencyTriageService;

    beforeEach(() => {
        emergencyTriageService = new EmergencyTriageService();
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

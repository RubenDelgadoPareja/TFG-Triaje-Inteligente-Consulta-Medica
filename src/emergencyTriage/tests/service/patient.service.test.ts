import { Patient } from "../../domain/patient";
import { getPatient } from "../../mocks/getPatient.mock";
import { PatientService } from "../../service/patient.service";


describe('Patient Service', () => {
    let patientService: PatientService;

    beforeEach(() => {
        patientService = new PatientService();
    });

    test('should create a patient', () => {
        const patient = getPatient();
        const result = patientService.createPatient(patient);

        expect(result).toBeInstanceOf(Patient);
        expect(result).toEqual(patient);
    });
});

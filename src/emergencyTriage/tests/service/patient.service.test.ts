import { Test, TestingModule } from "@nestjs/testing";
import { GenreEnum, Patient, PatientProps } from "../../domain/patient";
import { getDni } from "../../mocks/getPatient.mock";
import { PatientService } from "../../service/patient.service";


describe('Patient Service', () => {
    let patientService: PatientService;

    const patientProps: PatientProps = {
        name: 'John Doe',
        age: 30,
        dni: getDni(),
        genre: GenreEnum.MALE,
    };

    const patient = new Patient(patientProps);

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PatientService],
        }).compile();

        patientService = module.get<PatientService>(PatientService);
    });

    it('should be defined', () => {
        expect(patientService).toBeDefined();
    });

    test('should create a patient', () => {
        const result = patientService.createPatient(patientProps);

        expect(result).toBeInstanceOf(Patient);
        expect(result).toEqual(patient);
    });
});

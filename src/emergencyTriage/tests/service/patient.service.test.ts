import { Test, TestingModule } from "@nestjs/testing";
import { GenreEnum, Patient, PatientProps } from "../../domain/patient";
import { getDni } from "../../mocks/getPatient.mock";
import { PatientService } from "../../service/patient.service";
import { PatientRepository } from "../../infrastructure/repository/patient.repository";
import { PatientMapper } from "../../mapper/patient.mapper";


describe('Patient Service', () => {
    let patientService: PatientService;
    let mockPatientRepository: Partial<PatientRepository>;
    let mockPatientMapper: Partial<PatientMapper>;

    const patientProps: PatientProps = {
        name: 'John Doe',
        age: 30,
        dni: getDni(),
        genre: GenreEnum.MALE,
    };

    const patient = new Patient(patientProps);
    const patientEntity = {...patientProps};
    const patientResult = {...patientEntity};
    beforeEach(async () => {
        mockPatientMapper = {
            mapPatientPropsToEntity: jest.fn().mockReturnValue(patientEntity),
            mapPatientEntityToDomain: jest.fn().mockReturnValue(patient)
        };

        mockPatientRepository = {
            createPatient: jest.fn().mockReturnValue(patientResult)
        };


        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PatientService,
                { provide: PatientMapper, useValue: mockPatientMapper },
                { provide: PatientRepository, useValue: mockPatientRepository },
            ],
        }).compile();

        patientService = module.get<PatientService>(PatientService);
    });

    it('should be defined', () => {
        expect(patientService).toBeDefined();
    });

    test('should create a patient', async () => {
        const result = await patientService.createPatient(patientProps);

        expect(mockPatientMapper.mapPatientPropsToEntity).toHaveBeenCalledWith(patientProps);
        expect(mockPatientRepository.createPatient).toHaveBeenCalledWith(patientEntity);
        expect(mockPatientMapper.mapPatientEntityToDomain).toHaveBeenCalledWith(patientResult);
        expect(result).toEqual(patient);
    });
});

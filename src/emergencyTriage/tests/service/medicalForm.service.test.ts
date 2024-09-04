import { Test, TestingModule } from '@nestjs/testing';
import { MedicalForm, MedicalFormProps } from '../../domain/medicalForm';
import { MedicalFormService } from './../../service/medicalForm.service';
import { MedicalFormMapper } from '../../mapper/medicalForm.mapper';
import { getPatient } from '../../mocks/getPatient.mock';
import { PatientRepository } from '../../infrastructure/repository/patient.repository';
import { MedicalFormRepository } from '../../infrastructure/repository/medicalForm.repository';


describe('MedicalForm Service', () => {
    let medicalFormService: MedicalFormService;
    let mockMedicalFormMapper: Partial<MedicalFormMapper>;
    let mockMedicalFormRepository: Partial<MedicalFormRepository>;
    let mockPatientRepository: Partial<PatientRepository>;

    const medicalFormProps: MedicalFormProps = {
        patientId: 1,
        reason: 'Routine check-up',
        discriminators: 'fever',
        symptoms: 'fever',
        vitalSigns: 'default',
        diagnosis: 'No significant issues'
    };

    const patient = getPatient();
    const medicalFormEntity = {...medicalFormProps};
    const medicalFormResult = {...medicalFormEntity};
    const medicalForm = new MedicalForm(medicalFormProps);

    beforeEach(async () => {
        mockMedicalFormMapper = {
            mapMedicalFormPropsToEntity: jest.fn().mockReturnValue(medicalFormEntity),
            mapMedicalFormEntityToDomain: jest.fn().mockReturnValue(medicalForm)
        };

        mockMedicalFormRepository = {
            createMedicalForm: jest.fn().mockReturnValue(medicalFormResult)
        };

        mockPatientRepository = {
            getPatientById: jest.fn().mockReturnValue(patient)
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [MedicalFormService,
                { provide: MedicalFormMapper, useValue: mockMedicalFormMapper },
                { provide: MedicalFormRepository, useValue: mockMedicalFormRepository },
                { provide: PatientRepository, useValue: mockPatientRepository },
            ],
        }).compile();

        medicalFormService = module.get<MedicalFormService>(MedicalFormService);
    });

    it('should be defined', () => {
        expect(medicalFormService).toBeDefined();
    });

    test('should create a patient', async () => {
        const result = await medicalFormService.createMedicalForm(medicalFormProps);

        expect(mockPatientRepository.getPatientById).toHaveBeenCalledWith(medicalFormProps.patientId);
        expect(mockMedicalFormMapper.mapMedicalFormPropsToEntity).toHaveBeenCalledWith(medicalFormProps, patient);
        expect(mockMedicalFormRepository.createMedicalForm).toHaveBeenCalledWith(medicalFormEntity);
        expect(mockMedicalFormMapper.mapMedicalFormEntityToDomain).toHaveBeenCalledWith(medicalFormResult);
        expect(result).toEqual(medicalForm);
    });
});

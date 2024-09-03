import { Test, TestingModule } from '@nestjs/testing';
import { MedicalForm, MedicalFormProps } from '../../domain/medicalForm';
import { MedicalFormService } from './../../service/medicalForm.service';


describe('MedicalForm Service', () => {
    let medicalFormService: MedicalFormService;

    const medicalFormProps: MedicalFormProps = {
        patientId: 1,
        reason: 'Routine check-up',
        discriminators: 'fever',
        symptoms: 'fever',
        vitalSigns: 'default',
        diagnosis: 'No significant issues'
    };

    const medicalForm = new MedicalForm(medicalFormProps);

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MedicalFormService],
        }).compile();

        medicalFormService = module.get<MedicalFormService>(MedicalFormService);
    });

    it('should be defined', () => {
        expect(medicalFormService).toBeDefined();
    });

    test('should create a patient', () => {
        const result = medicalFormService.createMedicalForm(medicalFormProps);

        expect(result).toBeInstanceOf(MedicalForm);
        expect(result).toEqual(medicalForm);
    });
});

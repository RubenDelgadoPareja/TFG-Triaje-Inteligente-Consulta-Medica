import { MedicalForm } from '../../domain/medicalForm';
import { getMedicalForm } from '../../mocks/getMedicalForm.mock';
import { MedicalFormService } from './../../service/medicalForm.service';


describe('MedicalForm Service', () => {
    let medicalFormService: MedicalFormService;

    beforeEach(() => {
        medicalFormService = new MedicalFormService();
    });

    test('should create a patient', () => {
        const medicalForm = getMedicalForm();
        const result = medicalFormService.createMedicalForm(medicalForm);

        expect(result).toBeInstanceOf(MedicalForm);
        expect(result).toEqual(medicalForm);
    });
});

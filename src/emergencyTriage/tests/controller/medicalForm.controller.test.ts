import { MedicalForm, MedicalFormProps } from './../../domain/medicalForm';
import { Test, TestingModule } from "@nestjs/testing";
import { MedicalFormController } from "../../controller/medicarForm.controller";
import { MedicalFormService } from "../../service/medicalForm.service";
import { CreateMedicalFormDto } from "../../dto/medicalForm.dto";
import { MedicalFormMapper } from '../../mapper/medicalForm.mapper';

describe('MedicalForm Controller', () => {
    let medicalFormController: MedicalFormController;

    const medicalFormDto: CreateMedicalFormDto = {
        patientId: 1,
        reason: 'Headache',
        discriminators: 'Headache',
        symptoms: 'Headache',
        vitalSigns: 'Headache',
        diagnosis: 'Headache'
    };

    const medicalFormProps: MedicalFormProps = {
        patientId: medicalFormDto.patientId,
        reason: medicalFormDto.reason,
        discriminators: medicalFormDto.discriminators,
        symptoms: medicalFormDto.symptoms,
        vitalSigns: medicalFormDto.vitalSigns,
        diagnosis: medicalFormDto.diagnosis
    };

    const medicalForm = new MedicalForm(medicalFormProps);

    const mockMedicalFormMapper = {
        mapCreateDtoToMedicalFormProps: jest.fn().mockReturnValue(medicalFormProps),
    }

    const mockMedicalFormService = {
        createMedicalForm: jest.fn().mockReturnValue(medicalForm)
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MedicalFormController],
            providers: [{provide: MedicalFormService, useValue: mockMedicalFormService},
                        {provide: MedicalFormMapper, useValue: mockMedicalFormMapper}],
        }).compile();

        medicalFormController = module.get<MedicalFormController>(MedicalFormController);
    });

    it('should be defined', () => {
        expect(medicalFormController).toBeDefined();
    });

    it('should create a new MedicalForm', () => {


        jest.spyOn(mockMedicalFormService, 'createMedicalForm').mockReturnValue(medicalForm);
        jest.spyOn(mockMedicalFormMapper, 'mapCreateDtoToMedicalFormProps').mockReturnValue(medicalFormProps);
        const result = medicalFormController.create(medicalFormDto);

        expect(mockMedicalFormMapper.mapCreateDtoToMedicalFormProps).toHaveBeenCalledWith(medicalFormDto);
        expect(mockMedicalFormService.createMedicalForm).toHaveBeenCalledWith(medicalFormProps);

        expect(result).toEqual(medicalForm);
    });


});

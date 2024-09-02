import { MedicalForm, MedicalForm, MedicalFormProps } from './../../domain/medicalForm';
import { Test, TestingModule } from "@nestjs/testing";
import { MedicalFormController } from "../../controller/medicarForm.controller";
import { MedicalForm } from "../../domain/medicalForm";
import { MedicalFormService } from "../../service/medicalForm.service";
import { CreateMedicalFormDto } from "../../dto/medicalForm.dto";

describe('MedicalForm Controller', () => {
    let medicalFormController: MedicalFormController;

    const mockMedicalFormService = {
        create: jest.fn()
    };

    const mockMedicalFormMapper = {
        mapCreateDtoToMedicalFormProps: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MedicalFormController],
            providers: [MedicalFormService],
        }).compile();

        medicalFormController = module.get<MedicalFormController>(MedicalFormController);
    });

    it('should be defined', () => {
        expect(medicalFormController).toBeDefined();
    });

    it('should create a new MedicalForm', () => {
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

        jest.spyOn(mockMedicalFormService, 'create').mockReturnValue(medicalForm);
        jest.spyOn(mockMedicalFormMapper, 'mapCreateDtoToMedicalFormProps').mockReturnValue(medicalFormProps);
        const result = medicalFormController.create(medicalFormDto);

        expect(mockMedicalFormMapper.mapCreateDtoToMedicalFormProps).toHaveBeenCalledWith(medicalFormDto);
        expect(mockMedicalFormService.create).toHaveBeenCalled()
        expect(mockMedicalFormService.create).toHaveBeenCalledWith(medicalFormDto);

        expect(result).toEqual(medicalForm);
    });


});

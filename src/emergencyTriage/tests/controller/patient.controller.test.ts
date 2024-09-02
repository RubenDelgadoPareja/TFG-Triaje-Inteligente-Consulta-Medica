import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from '../../controller/patient.controller';
import { PatientService } from '../../service/patient.service';
import { GenreEnum, Patient, PatientProps } from '../../domain/patient';
import { CreatePatientDto } from '../../dto/patient.dto';
import { getDni } from '../../mocks/getPatient.mock';

describe('Patient Controller', () => {
    let patientController: PatientController;

    const mockPatientService = {
        create: jest.fn()
    };

    const mockPatientMapper = {
        mapCreateDtoToPatientProps: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PatientController],
            providers: [PatientService],
        }).compile();

        patientController = module.get<PatientController>(PatientController);
    });

    it('should be defined', () => {
        expect(patientController).toBeDefined();
    });

    it('should create a new Patient', () => {
        const patientDto: CreatePatientDto = {
            name: 'John Doe',
            age: 30,
            dni: getDni(),
            genre: GenreEnum.MALE
        };

        const patientProps: PatientProps = {
            name: patientDto.name,
            age: patientDto.age,
            dni: patientDto.dni,
            genre: patientDto.genre ?? GenreEnum.OTHER
        };

        const patient = new Patient(patientProps);

        jest.spyOn(mockPatientService, 'create').mockReturnValue(patient);
        jest.spyOn(mockPatientMapper, 'mapCreateDtoToPatientProps').mockReturnValue(patientProps);

        const result = patientController.create(patientDto);

        expect(mockPatientMapper.mapCreateDtoToPatientProps).toHaveBeenCalledWith(patientDto);
        expect(mockPatientService.create).toHaveBeenCalled()
        expect(mockPatientService.create).toHaveBeenCalledWith(patientDto);

        expect(result).toEqual(patient);

    });
});

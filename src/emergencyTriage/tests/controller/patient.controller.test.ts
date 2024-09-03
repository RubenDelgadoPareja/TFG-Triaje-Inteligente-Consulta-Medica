import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from '../../controller/patient.controller';
import { PatientService } from '../../service/patient.service';
import { GenreEnum, Patient, PatientProps } from '../../domain/patient';
import { CreatePatientDto } from '../../dto/patient.dto';
import { getDni } from '../../mocks/getPatient.mock';
import { PatientModule } from '../../module/patient.module';
import { PatientMapper } from '../../mapper/patient.mapper';

describe('Patient Controller', () => {
    let patientController: PatientController;
    let mockPatientService: Partial<PatientService>;
    let mockPatientMapper: Partial<PatientMapper>;

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
    beforeEach(async () => {
        mockPatientMapper = {
            mapCreateDtoToPatientProps: jest.fn().mockReturnValue(patientProps),
        }

        mockPatientService = {
            createPatient: jest.fn().mockReturnValue(patient)
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PatientController],
            providers: [{provide: PatientService, useValue: mockPatientService},
                        {provide: PatientMapper, useValue: mockPatientMapper}],
        }).compile();

        patientController = module.get<PatientController>(PatientController);
    });

    it('should be defined', () => {
        expect(patientController).toBeDefined();
    });

    it('should create a new Patient', () => {
        const result = patientController.create(patientDto);

        expect(mockPatientMapper.mapCreateDtoToPatientProps).toHaveBeenCalledWith(patientDto);
        expect(mockPatientService.createPatient).toHaveBeenCalledWith(patientProps);

        expect(result).toEqual(patient);

    });
});

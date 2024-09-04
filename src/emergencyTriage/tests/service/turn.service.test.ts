import { getMedicalForm } from './../../mocks/getMedicalForm.mock';
import { RiskEnum, Turn, TurnProps } from "../../domain/turn";
import { evaluateRisk, TurnService } from "../../service/turn.service";
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { PatientRepository } from '../../infrastructure/repository/patient.repository';
import { TurnRepository } from '../../infrastructure/repository/turn.repository';
import { TurnMapper } from '../../mapper/turn.mapper';
import { getPatient } from '../../mocks/getPatient.mock';


describe('Turn Service', () => {
    let turnService: TurnService;
    let mockTurnMapper: Partial<TurnMapper>;
    let mockTurnRepository: Partial<TurnRepository>;
    let mockPatientRepository: Partial<PatientRepository>;

    const turnProps: TurnProps = {
        patientId: 1,
        startedAt: new Date(),
        priority: 25,
        risk: RiskEnum.LOW,
    };

    const patient = getPatient();
    const turnEntity = {...turnProps};
    const turnResult = {...turnEntity};
    const turn = new Turn(turnResult);

    beforeEach(async () => {
        mockTurnMapper = {
            mapTurnPropsToEntity: jest.fn().mockReturnValue(turnResult),
            mapTurnEntityToDomain: jest.fn().mockReturnValue(turn)
        };

        mockTurnRepository = {
            createTurn: jest.fn().mockReturnValue(turnResult)
        };

        mockPatientRepository = {
            getPatientById: jest.fn().mockReturnValue(patient)
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [TurnService,
                { provide: TurnMapper, useValue: mockTurnMapper },
                { provide: TurnRepository, useValue: mockTurnRepository },
                { provide: PatientRepository, useValue: mockPatientRepository },
            ],
        }).compile();

        turnService = module.get<TurnService>(TurnService);
    });

    test('should create a turn', async () => {
        const result = await turnService.createTurn(turnProps);

        expect(mockPatientRepository.getPatientById).toHaveBeenCalledWith(turnProps.patientId);
        expect(mockTurnMapper.mapTurnPropsToEntity).toHaveBeenCalledWith(turnProps, patient);
        expect(mockTurnRepository.createTurn).toHaveBeenCalledWith(turnEntity);
        expect(mockTurnMapper.mapTurnEntityToDomain).toHaveBeenCalledWith(turnResult);
        expect(result).toEqual(turn);
    });

    test('should evaluate risk', () => {
        const riskEnum = evaluateRisk(80);
        expect(riskEnum).toBe('CRITICAL');
    });

    test('should estimate priority', () => {

        const MedicalForm = getMedicalForm(
            faker.number.int(),
            faker.number.int(),
            faker.lorem.sentence(),
            faker.lorem.sentence() + 'alteración del estado mental', // add 40 to priority
            faker.lorem.sentence() + 'dolor leve', // add 10 to priority
            faker.lorem.sentence(), // 0
            faker.lorem.sentence()
        );
        const result = turnService.estimatePriority(MedicalForm);

        expect(result).toBe(50);
    });
});

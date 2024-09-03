import { getMedicalForm } from './../../mocks/getMedicalForm.mock';
import { Turn } from "../../domain/turn";
import { getTurn } from "../../mocks/getTurn.mock";
import { TurnService } from "../../service/turn.service";
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';


describe('Turn Service', () => {
    let turnService: TurnService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TurnService],
        }).compile();

        turnService = module.get<TurnService>(TurnService);
    });

    test('should create a turn', () => {
        const turn = getTurn(undefined, 1);
        const result = turnService.createTurn(turn);

        expect(result).toBeInstanceOf(Turn);
        expect(result).toEqual(turn);
    });

    test('should evaluate risk', () => {
        const riskEnum = turnService.evaluateRisk(80);
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

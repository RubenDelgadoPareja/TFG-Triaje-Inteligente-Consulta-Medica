import { getMedicalForm } from './../../mocks/getMedicalForm.mock';
import { Turn } from "../../domain/turn";
import { getTurn } from "../../mocks/getTurn.mock";
import { TurnService } from "../../service/turn.service";
import { getPatient } from '../../mocks/getPatient.mock';
import { faker } from '@faker-js/faker';
import { GenreEnum } from '../../domain/patient';


describe('Turn Service', () => {
    let turnService: TurnService;

    beforeEach(() => {
        turnService = new TurnService();
    });

    test('should create a turn', () => {
        const turn = getTurn();
        const result = turnService.createTurn(turn);

        expect(result).toBeInstanceOf(Turn);
        expect(result).toEqual(turn);
    });

    test('should evaluate risk', () => {
        const riskEnum = turnService.evaluateRisk(80);
        expect(riskEnum).toBe('CRITICAL');
    });

    test('should estimate priority', () => {
        const patient = getPatient(
            'Little Jhon',
            undefined,
            66, // add 30 to priority
            GenreEnum.MALE
        );
        const MedicalForm = getMedicalForm(
            patient,
            faker.lorem.sentence(),
            faker.lorem.sentence() + 'alteración del estado mental', // add 40 to priority
            faker.lorem.sentence() + 'dolor leve', // add 10 to priority
            faker.lorem.sentence(), // 0
            faker.lorem.sentence()
        );
        const result = turnService.estimatePriority(MedicalForm);

        expect(result).toBe(80);
    });
});

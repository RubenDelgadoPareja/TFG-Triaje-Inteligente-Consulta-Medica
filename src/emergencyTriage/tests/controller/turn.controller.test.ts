import { Test, TestingModule } from "@nestjs/testing";
import { TurnController } from "../../controller/turn.controller";
import { RiskEnum, Turn } from "../../domain/turn";
import { TurnService } from "../../service/turn.service";
import { CreateTurnDto } from "../../dto/turn.dto";
import { TurnMapper } from "../../mapper/turn.mapper";

describe('Turn Controller', () => {
    let turnController: TurnController;

    const turnDto: CreateTurnDto = {
        patientId: 1,
        startedAt: new Date(),
        risk: RiskEnum.LOW,
        priority: 1
    };

    const turnProps = {
        patientId: turnDto.patientId,
        startedAt: turnDto.startedAt,
        risk: turnDto.risk,
        priority: turnDto.priority,
    };

    const turn = new Turn(turnProps);

    const mockTurnMapper = {
        mapCreateDtoToTurnProps: jest.fn().mockReturnValue(turnProps),
    };

    const mockTurnService = {
        createTurn: jest.fn().mockReturnValue(turn)
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TurnController],
            providers: [{provide: TurnService, useValue: mockTurnService},
                        {provide: TurnMapper, useValue: mockTurnMapper}],
        }).compile();

        turnController = module.get<TurnController>(TurnController);
    });

    it('should be defined', () => {
        expect(turnController).toBeDefined();
    });

    it('should create a new Turn', () => {


        jest.spyOn(mockTurnService, 'createTurn').mockReturnValue(turn);
        jest.spyOn(mockTurnMapper, 'mapCreateDtoToTurnProps').mockReturnValue(turnProps);

        const result = turnController.create(turnDto);

        expect(mockTurnMapper.mapCreateDtoToTurnProps).toHaveBeenCalledWith(turnDto);
        expect(mockTurnService.createTurn).toHaveBeenCalledWith(turnProps);

        expect(result).toEqual(turn);
    });
});

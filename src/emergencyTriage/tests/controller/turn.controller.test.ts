import { Test, TestingModule } from "@nestjs/testing";
import { TurnController } from "../../controller/turn.controller";
import { RiskEnum, Turn } from "../../domain/turn";
import { TurnService } from "../../service/turn.service";
import { CreateTurnDto } from "../../dto/turn.dto";

describe('Turn Controller', () => {
    let turnController: TurnController;

    const mockTurnService = {
        create: jest.fn()
    };

    const mockTurnMapper = {
        mapCreateDtoToTurnProps: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TurnController],
            providers: [TurnService],
        }).compile();

        turnController = module.get<TurnController>(TurnController);
    });

    it('should be defined', () => {
        expect(turnController).toBeDefined();
    });

    it('should create a new Turn', () => {
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

        jest.spyOn(mockTurnService, 'create').mockReturnValue(turn);
        jest.spyOn(mockTurnMapper, 'mapCreateDtoToTurnProps').mockReturnValue(turnProps);

        const result = turnController.create(turnDto);

        expect(mockTurnMapper.mapCreateDtoToTurnProps).toHaveBeenCalledWith(turnDto);
        expect(mockTurnService.create).toHaveBeenCalled()
        expect(mockTurnService.create).toHaveBeenCalledWith(turnDto);

        expect(result).toEqual(turn);
    });
});

import { Post, Body, Controller } from "@nestjs/common";
import { CreateTurnDto } from "../dto/turn.dto";
import { TurnService } from "../service/turn.service";
import { TurnMapper } from "../mapper/turn.mapper";
import { TurnProps } from "../domain/turn";

@Controller('turns')
export class TurnController {
    constructor(
        private readonly turnService: TurnService,
        private readonly turnMapper: TurnMapper
    ) {}

    @Post()
    create(@Body() createTurnDto: CreateTurnDto) {
        const turnProps: TurnProps = this.turnMapper.mapCreateDtoToTurnProps(createTurnDto);
        return this.turnService.createTurn(turnProps);
    }
}

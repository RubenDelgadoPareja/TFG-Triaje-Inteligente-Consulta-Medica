import { TurnProps } from "../domain/turn";
import { CreateTurnDto } from "../dto/turn.dto";


export class TurnMapper {
    constructor() { }

    mapCreateDtoToTurnProps(createTurnDto: CreateTurnDto): TurnProps {
        return {
            patientId: createTurnDto.patientId,
            startedAt: createTurnDto.startedAt,
            priority: createTurnDto.priority,
            risk: createTurnDto.risk,
        }
    }
}

import { Turn, TurnProps } from "../domain/turn";
import { CreateTurnDto, TurnDto, UpdateTurnDto } from "../dto/turn.dto";
import { PatientEntity } from "../infrastructure/orm/patient.entity";
import { TurnEntity } from "../infrastructure/orm/turn.entity";


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

    mapTurnPropsToEntity(turnProps: TurnProps, patient: PatientEntity): TurnEntity {
        const turnEntity =  new TurnEntity();
        turnEntity.id = turnProps.id;
        turnEntity.patient = patient;
        turnEntity.startedAt = turnProps.startedAt;
        turnEntity.priority = turnProps.priority;
        turnEntity.risk = turnProps.risk;
        return turnEntity;
    }

    mapTurnEntityToDomain(turnEntity: TurnEntity): Turn {
        return new Turn({
            id: turnEntity.id,
            patientId: turnEntity.patient.id,
            startedAt: turnEntity.startedAt,
            priority: turnEntity.priority,
            risk: turnEntity.risk,
        });
    }

    mapTurnDomainToDto(turn: Turn): TurnDto{
        if(!turn.id){
            throw new Error('Turn ID is required');
        }
        return {
            id: turn.id,
            patientId: turn.patientId,
            startedAt: turn.startedAt,
            priority: turn.priority,
            risk: turn.risk,
        }
    }

    mapUpdateDtoToTurnProps(updateTurnDto: UpdateTurnDto): TurnProps {
        return {
            id: updateTurnDto.id,
            patientId: updateTurnDto.patientId,
            startedAt: updateTurnDto.startedAt,
            priority: updateTurnDto.priority,
            risk: updateTurnDto.risk,
        }
    }
}

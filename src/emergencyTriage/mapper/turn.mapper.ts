import { Turn, TurnProps } from "../domain/turn";
import { CreateTurnDto } from "../dto/turn.dto";
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
        turnEntity.patient = patient;
        turnEntity.startedAt = turnProps.startedAt;
        turnEntity.priority = turnProps.priority;
        turnEntity.risk = turnProps.risk;
        return turnEntity;
    }

    mapTurnEntityToDomain(turnEntity: TurnEntity): Turn {
        return new Turn({
            patientId: turnEntity.patient.id,
            startedAt: turnEntity.startedAt,
            priority: turnEntity.priority,
            risk: turnEntity.risk,
        });
    }
}

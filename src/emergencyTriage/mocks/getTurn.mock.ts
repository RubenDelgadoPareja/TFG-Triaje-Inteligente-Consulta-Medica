import { faker } from "@faker-js/faker";
import { RiskEnum, Turn, TurnProps } from "../domain/turn";
import { TurnService } from "../service/turn.service";

export const getTurn = (id?: number, patientId?: number, priority?: number, startedAt?: Date, risk?: RiskEnum) => {
    const turnService = new TurnService();

    const turnProps: TurnProps = {
        id: id ?? undefined,
        patientId: patientId ?? faker.number.int(),
        startedAt: startedAt ?? new Date(),
        risk: risk ??  faker.helpers.enumValue(RiskEnum),
        priority: priority ?? Math.floor(Math.random() * 100),
    }

    turnProps.risk = turnService.evaluateRisk(turnProps.priority);
    return new Turn(turnProps)
}

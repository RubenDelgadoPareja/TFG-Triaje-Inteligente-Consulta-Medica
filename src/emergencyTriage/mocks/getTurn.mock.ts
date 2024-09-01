import { faker } from "@faker-js/faker";
import { Patient } from "../domain/patient";
import { RiskEnum, Turn, TurnProps } from "../domain/turn";
import { getPatient } from "./getPatient.mock";
import { TurnService } from "../service/turn.service";

export const getTurn = (patient?: Patient, priority?: number, startedAt?: Date, risk?: RiskEnum) => {
    const turnService = new TurnService();

    const turnProps: TurnProps = {
        patient: patient ?? getPatient(),
        startedAt: startedAt ?? new Date(),
        risk: risk ??  faker.helpers.enumValue(RiskEnum),
        priority: priority ?? Math.floor(Math.random() * 100),
    }

    turnProps.risk = turnService.evaluateRisk(turnProps.priority);
    return new Turn(turnProps)
}

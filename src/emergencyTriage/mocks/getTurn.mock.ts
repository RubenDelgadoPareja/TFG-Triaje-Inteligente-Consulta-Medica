import { faker } from "@faker-js/faker";
import { Patient } from "../domain/patient";
import { RiskEnum, Turn, TurnProps } from "../domain/turn";
import { getPatient } from "./getPatient.mock";

export const getTurn = (patient?: Patient, startedAt?: Date, risk?: RiskEnum, priority?: number) => {
    const turnProps: TurnProps = {
        patient: patient ?? getPatient(),
        startedAt: startedAt ?? faker.date.past(),
        risk: risk ??  faker.helpers.enumValue(RiskEnum),
        priority: priority ?? Math.floor(Math.random() * 100),
    }

    return new Turn(turnProps)
}

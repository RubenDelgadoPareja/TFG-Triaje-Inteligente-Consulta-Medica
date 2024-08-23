import { faker } from "@faker-js/faker";
import { Patient } from "../domain/patient";
import { RiskEnum, Turn } from "../domain/turn";
import { getPatient } from "./getPatient.mock";

export const getTurn = (patient?: Patient, startedAt?: Date, risk?: RiskEnum, _priority?: number) => {
    return new Turn(
        patient ?? getPatient(),
        startedAt ?? faker.date.past(),
        risk ??  faker.helpers.enumValue(RiskEnum),
        _priority ?? Math.floor(Math.random() * 100),
    )
}

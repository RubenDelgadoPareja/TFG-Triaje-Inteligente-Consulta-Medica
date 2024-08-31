import { Injectable } from "@nestjs/common";
import { RiskEnum, Turn, TurnProps } from "../domain/turn";


@Injectable()
export class TurnService {
    constructor() {}

    createTurn(props: TurnProps): Turn{
        const riskEnum = this.evaluateRisk(props.priority);

        return new Turn({
            patient: props.patient,
            priority: props.priority,
            startedAt: new Date(),
            risk: riskEnum,
        });
    }

    evaluateRisk(priority: number): RiskEnum {
        switch (true) {
            case (priority > 75):
                return RiskEnum.CRITICAL;
            case (50 < priority && priority <= 75):
                return RiskEnum.HIGH;
            case (25 < priority && priority <= 50):
                return RiskEnum.MEDIUM;
            case (priority <= 25):
                return RiskEnum.LOW;
            default:
                return RiskEnum.LOW;
        }
    }
}

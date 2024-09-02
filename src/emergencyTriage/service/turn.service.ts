import { MedicalForm } from './../domain/medicalForm';
import { Injectable } from "@nestjs/common";
import { RiskEnum, Turn, TurnProps } from "../domain/turn";


@Injectable()
export class TurnService {
    constructor() {}

    createTurn(props: TurnProps): Turn{
        const riskEnum = this.evaluateRisk(props.priority);

        return new Turn({
            patientId: props.patientId,
            priority: props.priority,
            startedAt: props.startedAt,
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

    estimatePriority(medicalForm: MedicalForm): number {
        let priority = 0;

            // Evaluar riesgo vital
        if (medicalForm.vitalSigns.includes('shock') || medicalForm.vitalSigns.includes('paro respiratorio')) {
            return 100; // Prioridad máxima
        }

            // Evaluar el nivel de dolor
        if (medicalForm.symptoms.includes('dolor muy intenso')) {
            priority += 30;
        } else if (medicalForm.symptoms.includes('dolor moderado')) {
            priority += 20;
        } else if (medicalForm.symptoms.includes('dolor leve')) {
            priority += 10;
        }

         // Evaluar signos discriminadores
        if (medicalForm.discriminators.includes('inestabilidad hemodinámica') || medicalForm.discriminators.includes('alteración del estado mental')) {
            priority += 40;
        } else if (medicalForm.discriminators.includes('riesgo vital inminente')) {
            priority += 50;
        }

        // TODO: Evaluar edad del paciente. Create a GET by id patient
        // const age = medicalForm.patient.age;
        // if (age < 1) {
        //     priority += 40; // Prioridad máxima para recién nacidos
        // } else if (age >= 1 && age < 8) {
        //     priority += 20; // Niños pequeños
        // } else if (age >= 65) {
        //     priority += 30; // Adultos mayores
        // }



    return Math.min(priority, 100);
    }

}

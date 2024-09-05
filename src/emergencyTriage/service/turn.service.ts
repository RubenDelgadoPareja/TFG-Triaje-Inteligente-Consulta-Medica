import { TurnMapper } from './../mapper/turn.mapper';
import { MedicalForm } from './../domain/medicalForm';
import { Injectable, NotFoundException } from "@nestjs/common";
import { RiskEnum, Turn, TurnProps } from "../domain/turn";
import { TurnRepository } from '../infrastructure/repository/turn.repository';
import { PatientRepository } from '../infrastructure/repository/patient.repository';


@Injectable()
export class TurnService {
    constructor(
        private readonly turnMapper: TurnMapper,
        private readonly turnRepository: TurnRepository,
        private readonly patientRepository: PatientRepository,
    ) {}

    async findAll(): Promise<Turn[]> {
        const turnEntities = await this.turnRepository.getAll();
        return turnEntities.map(turnEntity => this.turnMapper.mapTurnEntityToDomain(turnEntity));
    }

    async findOne(id: number): Promise<Turn> {
        const turnEntity = await this.turnRepository.getTurnById(id);
        if (!turnEntity) {
            throw new NotFoundException(`Turn with ID ${id} not found`);
        }
        return this.turnMapper.mapTurnEntityToDomain(turnEntity);
    }

    async createTurn(props: TurnProps): Promise<Turn>{
        const riskEnum = evaluateRisk(props.priority);

        const turnProps = {
            ...props,
            risk: riskEnum,
        }
        const patient = await this.patientRepository.getPatientById(turnProps.patientId);
        const turnEntity = this.turnMapper.mapTurnPropsToEntity(turnProps, patient);
        const turnResult = await this.turnRepository.createTurn(turnEntity);
        return this.turnMapper.mapTurnEntityToDomain(turnResult);
    }

    async update(id: number, props: TurnProps): Promise<Turn> {
        const existingTurn = await this.turnRepository.getTurnById(id);
        if (!existingTurn) {
            throw new NotFoundException(`Turn with ID ${id} not found`);
        }

        const riskEnum = evaluateRisk(props.priority);
        const updatedProps = { ...props, id: id, risk: riskEnum };

        const patient = await this.patientRepository.getPatientById(updatedProps.patientId);
        if (!patient) {
            throw new NotFoundException(`Patient with ID ${updatedProps.patientId} not found`);
        }

        const turnEntity = this.turnMapper.mapTurnPropsToEntity(updatedProps, patient);
        const updatedTurnEntity = await this.turnRepository.updateTurn(id, turnEntity);
        return this.turnMapper.mapTurnEntityToDomain(updatedTurnEntity);
    }

    async remove(id: number): Promise<void> {
        return await this.turnRepository.removeTurn(id);
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

export function evaluateRisk(priority: number): RiskEnum {
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

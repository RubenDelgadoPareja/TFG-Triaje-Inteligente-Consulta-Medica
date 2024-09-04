import { Repository } from "typeorm";
import { TurnEntity } from "../orm/turn.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PatientRepository } from "./patient.repository";
import { ConflictException, NotFoundException } from "@nestjs/common";


export class TurnRepository extends Repository<TurnEntity>{
    constructor(
        @InjectRepository(TurnEntity)
        private readonly repository: Repository<TurnEntity>,
        private readonly patientRepository: PatientRepository,
    ){
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async getAll(): Promise<TurnEntity[]> {
        return await this.repository.find({
            relations: ['patient'],
        });
    }

    async getTurnById(turnId: number): Promise<TurnEntity> {
        const turn = await this.repository.findOne({
            where: { id: turnId },
            relations: ['patient'],
        });

        if (!turn) {
          throw new NotFoundException(`Turn with ID ${turnId} not found`);
        }

        return turn;
      }

    async createTurn(turn: TurnEntity): Promise<TurnEntity>{
         // Verificar si el paciente existe
        const patient = await this.patientRepository.getPatientById(turn.patient.id);
        if (!patient) {
        throw new NotFoundException(`Patient with ID ${turn.patient.id} does not exist`);
        }
        const existingTurn = await this.repository.findOne({
            where: {
            patient: turn.patient,
            startedAt: turn.startedAt,
            },
        });

        if (existingTurn) {
            throw new ConflictException('Turn already exists');
        }

        // Guardar el nuevo turno
        return await this.repository.save(turn);
    }


    async updateTurn(turnId: number, turn: TurnEntity): Promise<TurnEntity> {
        // Buscar el turno para actualizar
        const existingTurn = await this.getTurnById(turnId);

        if (!existingTurn) {
            throw new NotFoundException(`Turn with ID ${turnId} not found`);
        }

        // Actualizar el turno
        await this.repository.update(turnId, turn);

        // Retornar el turno actualizado
        const turnEdited = await this.getTurnById(turnId);
        if(!turnEdited){
            throw new NotFoundException(`Turn with ID ${turnEdited} not found`);
        }
        return turnEdited;
    }

    async removeTurn(turnId: number): Promise<void> {
        const result = await this.repository.delete(turnId);

        if (result.affected === 0) {
            throw new NotFoundException(`Turn with ID ${turnId} not found`);
        }
    }
}

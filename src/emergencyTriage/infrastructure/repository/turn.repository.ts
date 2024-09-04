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


    async getTurnById(turnId: number): Promise<TurnEntity> {
        const turn = await this.repository.findOne({ where: { id: turnId } });

        if (!turn) {
          throw new NotFoundException(`Turn with ID ${turnId} not found`);
        }

        return turn;
      }

    async createTurn(turn: TurnEntity): Promise<TurnEntity>{
         // Verificar si el paciente existe
         console.log(turn.patient.id);
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
}

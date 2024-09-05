import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { RiskEnum } from '../../domain/turn';

@Entity('turns')
export class TurnEntity{
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => PatientEntity, (patient) => patient.id)
  patient!: PatientEntity;

  @Column({ type: 'timestamp' })
  startedAt!: Date;

  @Column({
    type: 'enum',
    enum: RiskEnum,
    nullable: true,
  })
  risk?: RiskEnum;

  @Column()
  priority!: number;
}

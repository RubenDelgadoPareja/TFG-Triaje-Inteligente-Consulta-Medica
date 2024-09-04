import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatientEntity } from "./patient.entity";


@Entity('medical_forms')
export class MedicalFormEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => PatientEntity, (patient) => patient.id)
    patient!: PatientEntity;

    @Column()
    reason!: string;

    @Column()
    discriminators!: string;

    @Column()
    symptoms!: string;

    @Column()
    vitalSigns!: string;

    @Column()
    diagnosis!: string;

}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { GenreEnum } from '../../domain/patient';

@Entity('patients')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column()
  age!: number;

  @Column({ unique: true })
  dni!: string;

  @Column({ type: 'enum', enum: GenreEnum, default: GenreEnum.OTHER})
  genre!: GenreEnum;
}

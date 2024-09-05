import { Dni } from './../domain/dni';
import { GenreEnum, Patient, PatientProps } from "../domain/patient";
import { CreatePatientDto, PatientDto, UpdatePatientDto } from "../dto/patient.dto";
import { PatientEntity } from "../infrastructure/orm/patient.entity";

export class PatientMapper {
    constructor() {}

    mapCreateDtoToPatientProps(createPatientDto: CreatePatientDto): PatientProps {
        const newDni: Dni = new Dni(createPatientDto.dni.toString());
        const patientProps: PatientProps = {
            name: createPatientDto.name,
            dni: newDni,
            age: createPatientDto.age,
            genre: createPatientDto.genre ? createPatientDto.genre : GenreEnum.OTHER,
        };
        return patientProps;
    }

    mapPatientPropsToEntity(patientProps: PatientProps): PatientEntity {
        const patientEntity = new PatientEntity();

        patientEntity.name = patientProps.name;
        patientEntity.dni = patientProps.dni.value;
        patientEntity.age = patientProps.age;
        patientEntity.genre = patientProps.genre;
        return patientEntity;
    }

    mapPatientEntityToDomain(patientEntity: PatientEntity): Patient {
        return new Patient({
            id: patientEntity.id,
            name: patientEntity.name,
            dni: new Dni(patientEntity.dni),
            age: patientEntity.age,
            genre: patientEntity.genre,
        });
    }

    mapPatientDomainToDto(patient: Patient): PatientDto{
        if(!patient.id){
            throw new Error('Patient ID is required');
        }
        return {
            id: patient.id,
            name: patient.name,
            dni: patient.dni.value,
            age: patient.age,
            genre: patient.genre,
        }
    }

    mapUpdateDtoToPatientProps(updatePatientDto: UpdatePatientDto): PatientProps {
        const newDni: Dni = new Dni(updatePatientDto.dni.toString());
        const patientProps: PatientProps = {
            id: updatePatientDto.id,
            name: updatePatientDto.name,
            dni: newDni,
            age: updatePatientDto.age,
            genre: updatePatientDto.genre ? updatePatientDto.genre : GenreEnum.OTHER,
        };
        return patientProps;
    }
}

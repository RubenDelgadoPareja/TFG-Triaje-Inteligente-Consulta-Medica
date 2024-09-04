import { Dni } from './../domain/dni';
import { GenreEnum, Patient, PatientProps } from "../domain/patient";
import { CreatePatientDto } from "../dto/patient.dto";
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
        const patientOrm = new PatientEntity();

        patientOrm.name = patientProps.name;
        patientOrm.dni = patientProps.dni.value;
        patientOrm.age = patientProps.age;
        patientOrm.genre = patientProps.genre;
        return patientOrm;
    }

    mapPatientEntityToDomain(patientOrm: PatientEntity): Patient {
        return new Patient({
            id: patientOrm.id,
            name: patientOrm.name,
            dni: new Dni(patientOrm.dni),
            age: patientOrm.age,
            genre: patientOrm.genre,
        });
    }
}

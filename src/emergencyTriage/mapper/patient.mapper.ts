import { GenreEnum, PatientProps } from "../domain/patient";
import { CreatePatientDto } from "../dto/patient.dto";

export class PatientMapper {
    constructor() {}

    mapCreateDtoToPatientProps(createPatientDto: CreatePatientDto): PatientProps {
        return {
            name: createPatientDto.name,
            dni: createPatientDto.dni,
            age: createPatientDto.age,
            genre: createPatientDto.genre ? createPatientDto.genre : GenreEnum.OTHER,
        };
    }
}

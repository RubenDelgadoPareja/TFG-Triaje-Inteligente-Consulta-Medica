import { MedicalFormProps } from "../domain/medicalForm";
import { CreateMedicalFormDto } from "../dto/medicalForm.dto";


export class MedicalFormMapper {
    constructor() { }

    mapCreateDtoToMedicalFormProps(createMedicalFormDto: CreateMedicalFormDto): MedicalFormProps {
        return {
            patientId: createMedicalFormDto.patientId,
            reason: createMedicalFormDto.reason,
            discriminators: createMedicalFormDto.discriminators,
            symptoms: createMedicalFormDto.symptoms,
            vitalSigns: createMedicalFormDto.vitalSigns,
            diagnosis: createMedicalFormDto.diagnosis
        }
    }
}

import { MedicalForm, MedicalFormProps } from "../domain/medicalForm";
import { CreateMedicalFormDto, MedicalFormDto, UpdateMedicalFormDto } from "../dto/medicalForm.dto";
import { MedicalFormEntity } from "../infrastructure/orm/medicalForm.entity";
import { PatientEntity } from "../infrastructure/orm/patient.entity";


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

    mapMedicalFormPropsToEntity(medicalFormProps: MedicalFormProps, patient: PatientEntity): MedicalFormEntity {
        const medicalFormEntity = new MedicalFormEntity();

        medicalFormEntity.patient = patient;
        medicalFormEntity.reason = medicalFormProps.reason;
        medicalFormEntity.discriminators = medicalFormProps.discriminators;
        medicalFormEntity.symptoms = medicalFormProps.symptoms;
        medicalFormEntity.vitalSigns = medicalFormProps.vitalSigns;
        medicalFormEntity.diagnosis = medicalFormProps.diagnosis;
        return medicalFormEntity;
    }

    mapMedicalFormEntityToDomain(medicalFormEntity: MedicalFormEntity): MedicalForm {
        return new MedicalForm({
            id: medicalFormEntity.id,
            patientId: medicalFormEntity.patient.id,
            reason: medicalFormEntity.reason,
            discriminators: medicalFormEntity.discriminators,
            symptoms: medicalFormEntity.symptoms,
            vitalSigns: medicalFormEntity.vitalSigns,
            diagnosis: medicalFormEntity.diagnosis
        });
    }

    mapMedicalFormDomainToDto(medicalForm: MedicalForm): MedicalFormDto {
        if(!medicalForm.id){
            throw new Error('Medical form ID is required');
        }
        return {
            id: medicalForm.id,
            patientId: medicalForm.patientId,
            reason: medicalForm.reason,
            discriminators: medicalForm.discriminators,
            symptoms: medicalForm.symptoms,
            vitalSigns: medicalForm.vitalSigns,
            diagnosis: medicalForm.diagnosis
        }
    }

    mapUpdateDtoToMedicalFormProps(updateMedicalFormDto: UpdateMedicalFormDto): MedicalFormProps {
        return {
            id: updateMedicalFormDto.id,
            patientId: updateMedicalFormDto.patientId,
            reason: updateMedicalFormDto.reason,
            discriminators: updateMedicalFormDto.discriminators,
            symptoms: updateMedicalFormDto.symptoms,
            vitalSigns: updateMedicalFormDto.vitalSigns,
            diagnosis: updateMedicalFormDto.diagnosis
        }
    }
}

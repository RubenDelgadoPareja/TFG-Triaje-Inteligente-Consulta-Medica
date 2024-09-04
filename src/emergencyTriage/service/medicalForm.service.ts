import { Injectable } from "@nestjs/common";
import { MedicalForm, MedicalFormProps } from "../domain/medicalForm";
import { MedicalFormMapper } from "../mapper/medicalForm.mapper";
import { MedicalFormRepository } from "../infrastructure/repository/medicalForm.repository";
import { PatientRepository } from "../infrastructure/repository/patient.repository";

@Injectable()
export class MedicalFormService {
    constructor(
        private readonly medicalFormMapper: MedicalFormMapper,
        private readonly medicalFormRepository: MedicalFormRepository,
        private readonly patientRepository: PatientRepository,
    ) {}

    async createMedicalForm(props: MedicalFormProps): Promise<MedicalForm>{

        const patientEntity = await this.patientRepository.getPatientById(props.patientId);
        const medicalFormEntity = this.medicalFormMapper.mapMedicalFormPropsToEntity(props, patientEntity);
        const medicalFormResult  = await this.medicalFormRepository.createMedicalForm(medicalFormEntity);
        return this.medicalFormMapper.mapMedicalFormEntityToDomain(medicalFormResult);
    }
}

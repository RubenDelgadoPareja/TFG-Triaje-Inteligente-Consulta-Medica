import { Body } from '@nestjs/common';
import { MedicalFormService } from './../service/medicalForm.service';

export class MedicalFormController {
    constructor(
        private readonly MedicalFormService: MedicalFormService
    ){}

    create(@Body() createMedicalFormDto: CreateMedicalFormDto){
        const medicalFormProps: MedicalFormProps = this.medicalFormMapper.mapCreateDtoToMedicalFormProps(createMedicalFormDto);
        return this.medicalFormService.createMedicalForm(medicalFormProps);
    }

}

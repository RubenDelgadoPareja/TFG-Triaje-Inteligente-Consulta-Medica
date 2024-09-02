import { Body, Post } from '@nestjs/common';
import { MedicalFormService } from './../service/medicalForm.service';
import { CreateMedicalFormDto } from '../dto/medicalForm.dto';
import { MedicalFormProps } from '../domain/medicalForm';
import { MedicalFormMapper } from '../mapper/medicalForm.mapper';

export class MedicalFormController {
    constructor(
        private readonly medicalFormService: MedicalFormService,
        private readonly medicalFormMapper: MedicalFormMapper
    ){}

    @Post()
    create(@Body() createMedicalFormDto: CreateMedicalFormDto){
        const medicalFormProps: MedicalFormProps = this.medicalFormMapper.mapCreateDtoToMedicalFormProps(createMedicalFormDto);
        return this.medicalFormService.createMedicalForm(medicalFormProps);
    }

}

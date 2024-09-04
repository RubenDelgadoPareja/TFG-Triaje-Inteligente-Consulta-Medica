import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { MedicalFormService } from '../service/medicalForm.service';
import { CreateMedicalFormDto, UpdateMedicalFormDto } from '../dto/medicalForm.dto';
import { MedicalForm, MedicalFormProps } from '../domain/medicalForm';
import { MedicalFormMapper } from '../mapper/medicalForm.mapper';

@Controller('medical-forms')
export class MedicalFormController {
    constructor(
        private readonly medicalFormService: MedicalFormService,
        private readonly medicalFormMapper: MedicalFormMapper
    ){}

    @Get()
    async findAll() {
        // Método en MedicalFormService para obtener todos los formularios médicos
        const medicalForms: MedicalForm[] = await this.medicalFormService.findAll();
        return medicalForms.map(medicalForm => this.medicalFormMapper.mapMedicalFormDomainToDto(medicalForm));
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const medicalForm = await this.medicalFormService.findOne(id);
        if (!medicalForm) {
            throw new NotFoundException(`Medical form with ID ${id} not found`);
        }
        return this.medicalFormMapper.mapMedicalFormDomainToDto(medicalForm);
    }

    @Post()
    async create(@Body() createMedicalFormDto: CreateMedicalFormDto){
        const medicalFormProps: MedicalFormProps = this.medicalFormMapper.mapCreateDtoToMedicalFormProps(createMedicalFormDto);
        return await this.medicalFormService.createMedicalForm(medicalFormProps);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateMedicalFormDto: UpdateMedicalFormDto) {
        const medicalFormProps: MedicalFormProps = this.medicalFormMapper.mapUpdateDtoToMedicalFormProps(updateMedicalFormDto);
        const medicalForm = await this.medicalFormService.updateMedicalForm(id, medicalFormProps);
        if (!medicalForm) {
            throw new NotFoundException(`Medical form with ID ${id} not found`);
        }
        return this.medicalFormMapper.mapMedicalFormDomainToDto(medicalForm);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        await this.medicalFormService.removeMedicalForm(id);
        return { message: `Medical form with ID ${id} successfully deleted` };
    }
}

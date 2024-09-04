import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { PatientService } from "../service/patient.service";
import { CreatePatientDto, UpdatePatientDto } from "../dto/patient.dto";
import { Patient, PatientProps } from "../domain/patient";
import { PatientMapper } from "../mapper/patient.mapper";

@Controller('patients')
export class PatientController {
    constructor(
        private readonly patientService: PatientService,
        private readonly patientMapper: PatientMapper,
    ) {}

    @Get()
    async findAll() {
        // Obtener todos los pacientes
        const patients: Patient[] = await this.patientService.findAll();
        return patients.map(patient => this.patientMapper.mapPatientDomainToDto(patient));
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        // Obtener un paciente por ID
        const patient = await this.patientService.findOne(id);
        if (!patient) {
            throw new NotFoundException(`Patient with ID ${id} not found`);
        }
        return this.patientMapper.mapPatientDomainToDto(patient);
    }

    @Post()
    async create(@Body() createPatientDto: CreatePatientDto) {
        const patientProps: PatientProps = this.patientMapper.mapCreateDtoToPatientProps(createPatientDto);
        return await this.patientService.createPatient(patientProps);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updatePatientDto: UpdatePatientDto) {
        // Actualizar un paciente existente
        const patientProps: PatientProps = this.patientMapper.mapUpdateDtoToPatientProps(updatePatientDto);
        const patient = await this.patientService.update(id, patientProps);
        if (!patient) {
            throw new NotFoundException(`Patient with ID ${id} not found`);
        }
        return this.patientMapper.mapPatientDomainToDto(patient);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        // Eliminar un paciente
        await this.patientService.remove(id);
        return { message: `Patient with ID ${id} successfully deleted` };
    }
}

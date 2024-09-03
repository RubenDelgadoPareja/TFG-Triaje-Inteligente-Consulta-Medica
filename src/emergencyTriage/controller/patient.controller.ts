import { Body, Controller, Post } from "@nestjs/common";
import { PatientService } from "../service/patient.service";
import { CreatePatientDto } from "../dto/patient.dto";
import { PatientProps } from "../domain/patient";
import { PatientMapper } from "../mapper/patient.mapper";

@Controller('patients')
export class PatientController {
    constructor(
        private readonly patientService: PatientService,
        private readonly patientMapper: PatientMapper,
    ) {}

    @Post()
    create(@Body() createPatientDto: CreatePatientDto) {
        const patientProps: PatientProps = this.patientMapper.mapCreateDtoToPatientProps(createPatientDto);
        return this.patientService.createPatient(patientProps);
    }
}

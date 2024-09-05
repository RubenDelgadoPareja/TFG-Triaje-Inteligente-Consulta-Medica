import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateMedicalFormDto {
    @IsNumber()
    @IsNotEmpty()
    readonly patientId!: number;

    @IsNotEmpty()
    @IsString()
    readonly reason!: string;

    @IsNotEmpty()
    @IsString()
    readonly discriminators!: string;

    @IsNotEmpty()
    @IsString()
    readonly symptoms!: string;

    @IsNotEmpty()
    @IsString()
    readonly vitalSigns!: string;

    @IsNotEmpty()
    @IsString()
    readonly diagnosis!: string;
}

export class MedicalFormDto extends CreateMedicalFormDto {
    @IsNumber()
    @IsNotEmpty()
    readonly id!: number;
}

export class UpdateMedicalFormDto extends MedicalFormDto {
}

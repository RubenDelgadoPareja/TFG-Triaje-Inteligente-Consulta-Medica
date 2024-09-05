import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, Min } from "class-validator";
import { GenreEnum } from "../domain/patient";



export class CreatePatientDto{
    @IsString()
    @IsNotEmpty()
    readonly name!: string;

    @IsString()
    @Matches( /^\d{8}[A-HJ-NP-TV-Z]$/, {message: 'Dni must have 8 digits'})
    @IsNotEmpty()
    readonly dni!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(120)
    readonly age!: number;

    @IsOptional()
    @IsEnum(GenreEnum)
    readonly genre?: GenreEnum;

}

export class PatientDto extends CreatePatientDto{
    @IsInt()
    @IsNotEmpty()
    readonly id!: number;
}

export class UpdatePatientDto extends PatientDto{
}


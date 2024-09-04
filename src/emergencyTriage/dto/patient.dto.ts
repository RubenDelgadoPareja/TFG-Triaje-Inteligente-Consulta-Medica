import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, Min, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { GenreEnum } from "../domain/patient";

export class DniDto{
    @IsString()
    @Matches( /^\d{8}[A-HJ-NP-TV-Z]$/, {message: 'Dni must have 8 digits'})
    readonly value!: string;
}


export class CreatePatientDto{
    @IsString()
    @IsNotEmpty()
    readonly name!: string;

    @Type(() => DniDto)
    @ValidateNested()
    @IsNotEmpty()
    readonly dni!: DniDto;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(120)
    readonly age!: number;

    @IsOptional()
    @IsEnum(GenreEnum)
    readonly genre?: GenreEnum;

}

import { IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Matches, Max, Min, ValidateNested } from "class-validator";
import { Dni } from "../domain/dni";
import { Type } from 'class-transformer';
import { GenreEnum } from "../domain/patient";

export class DniDto{
    @IsString()
    @Matches(/^[0-9]{8}$/, {message: 'Dni must have 8 digits'})
    readonly value!: string;
}


export class CreatePatientDto{
    @IsString()
    @IsNotEmpty()
    readonly name!: string;

    @IsObject()
    @Type(() => DniDto)
    @ValidateNested()
    @IsNotEmpty()
    readonly dni!: Dni;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(120)
    readonly age!: number;

    @IsOptional()
    @IsEnum(GenreEnum)
    readonly genre?: GenreEnum;




}

import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { RiskEnum } from "../domain/turn";


export class CreateTurnDto {
    @IsNumber()
    @IsNotEmpty()
    readonly patientId!: number;

    @IsDate()
    @IsNotEmpty()
    readonly startedAt!: Date;

    @IsNotEmpty()
    @IsNumber()
    readonly priority!: number;

    @IsOptional()
    @IsEnum(RiskEnum)
    readonly risk?: RiskEnum;
}

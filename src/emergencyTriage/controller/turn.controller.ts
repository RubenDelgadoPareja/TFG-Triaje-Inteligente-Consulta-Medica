import { Post, Body, Controller, Get, Param, NotFoundException, Put, Delete } from "@nestjs/common";
import { CreateTurnDto, UpdateTurnDto } from "../dto/turn.dto";
import { TurnService } from "../service/turn.service";
import { TurnMapper } from "../mapper/turn.mapper";
import { Turn, TurnProps } from "../domain/turn";

@Controller('turns')
export class TurnController {
    constructor(
        private readonly turnService: TurnService,
        private readonly turnMapper: TurnMapper
    ) {}

    @Get()
    async findAll() {
        // Método en TurnService para obtener todos los turnos
        const turns: Turn[] = await this.turnService.findAll();
        return turns.map(turn => this.turnMapper.mapTurnDomainToDto(turn));
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const turn = await this.turnService.findOne(id);
        if (!turn) {
            throw new NotFoundException(`Turn with ID ${id} not found`);
        }
        return this.turnMapper.mapTurnDomainToDto(turn);
    }

    @Post()
    async create(@Body() createTurnDto: CreateTurnDto) {
        const turnProps: TurnProps = this.turnMapper.mapCreateDtoToTurnProps(createTurnDto);
        const turn = await this.turnService.createTurn(turnProps);
        return turn;
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateTurnDto: UpdateTurnDto) {
        const turnProps: TurnProps = this.turnMapper.mapUpdateDtoToTurnProps(updateTurnDto);
        const turn = await this.turnService.update(id, turnProps);
        if (!turn) {
            throw new NotFoundException(`Turn with ID ${id} not found`);
        }
        return this.turnMapper.mapTurnDomainToDto(turn);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        await this.turnService.remove(id);
        return { message: `Turn with ID ${id} successfully deleted` };
    }
}

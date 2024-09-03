import { Module } from '@nestjs/common';
import { TurnController } from '../controller/turn.controller';
import { TurnMapper } from '../mapper/turn.mapper';
import { TurnService } from '../service/turn.service';

@Module({
  controllers: [TurnController],
  providers: [TurnService, TurnMapper],
  exports: [TurnService, TurnMapper],
})
export class TurnModule {}

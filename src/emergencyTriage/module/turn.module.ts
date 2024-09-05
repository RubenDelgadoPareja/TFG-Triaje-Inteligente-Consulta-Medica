import { Module } from '@nestjs/common';
import { TurnController } from '../controller/turn.controller';
import { TurnMapper } from '../mapper/turn.mapper';
import { TurnService } from '../service/turn.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnEntity } from '../infrastructure/orm/turn.entity';
import { TurnRepository } from '../infrastructure/repository/turn.repository';
import { PatientModule } from './patient.module';

@Module({
  imports: [TypeOrmModule.forFeature([TurnEntity]), PatientModule],
  controllers: [TurnController],
  providers: [TurnService, TurnMapper, TurnRepository],
  exports: [TurnService, TurnMapper, TurnRepository],
})
export class TurnModule {}

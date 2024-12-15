import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferentielController } from './referentiel.controller';
import { ReferentielService } from './referentiel.service';
import { Specialist, SpecialistAppointement } from './specialist/specialist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specialist, SpecialistAppointement])],
  controllers: [ReferentielController],
  providers: [ReferentielService],
})
export class ReferentielModule {}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { SpecialistDto } from 'src/dto/specialist.dto'; 
import { ReferentielService } from './referentiel.service';
import { Specialist } from './specialist/specialist.entity';
import { SpecialistMapper } from 'src/mappers/specialist.mapper'; 

@Controller('referentiel')
export class ReferentielController {
  constructor(private referentielService: ReferentielService) {}

  @Get('specialists')
  async getSpecialists(): Promise<SpecialistDto[]> {
    const specialists: Specialist[] =
      await this.referentielService.getSpecialists();
    return specialists.map((specialist) =>
      SpecialistMapper.mapSpecialistToDto(specialist),
    );
  }

  @Post('specialists')
  async addSpecialist(
    @Body() specialistDto: SpecialistDto,
  ): Promise<SpecialistDto> {
    return this.referentielService.addSpecialist(specialistDto);
  }

  @Post('specialists/bulk')
  async addMultipleSpecialists(
    @Body() specialistDtos: SpecialistDto[],
  ): Promise<SpecialistDto[]> {
    return this.referentielService.addMultipleSpecialists(specialistDtos);
  }
}

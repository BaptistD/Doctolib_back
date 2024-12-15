import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialistDto, SpecialistAppointementDto } from 'src/dto/specialist.dto';
import { Specialist, SpecialistAppointement } from './specialist/specialist.entity';
import { SpecialistMapper, SpecialistAppointementMapper } from 'src/mappers/specialist.mapper';

@Injectable()
export class ReferentielService {
  
  constructor(
    @InjectRepository(Specialist)
    private specialistRepository: Repository<Specialist>,
    private specialistAppointementRepository: Repository<SpecialistAppointement>,
  ) {}

  async getSpecialists(): Promise<Specialist[]> {
    return this.specialistRepository.find({ relations: ['appointment'] });
  }

  async addSpecialist(specialistDto: SpecialistDto): Promise<SpecialistDto> {
    const specialist = this.specialistRepository.create(specialistDto);
    const savedSpecialist = await this.specialistRepository.save(specialist);
    return SpecialistMapper.mapSpecialistToDto(savedSpecialist);
  }

  async addMultipleSpecialists(
    specialistDtos: SpecialistDto[],
  ): Promise<SpecialistDto[]> {
    const specialists = specialistDtos.map((specialistDto) =>
      this.specialistRepository.create(specialistDto),
    );
    const savedSpecialists = await this.specialistRepository.save(specialists);
    return savedSpecialists.map((specialist) =>
      SpecialistMapper.mapSpecialistToDto(specialist),
    );
  }

  async addAppointment(
    appointmentDto: SpecialistAppointementDto,
  ): Promise<SpecialistAppointementDto> {
    const appointment = this.specialistAppointementRepository.create(
      appointmentDto,
    );
    const savedAppointment = await this.specialistAppointementRepository.save(
      appointment,
    );
    return SpecialistAppointementMapper.mapAppointementToDto(savedAppointment);
  }
}

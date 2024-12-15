// src/utils/specialist.mapper.ts
import { SpecialistDto , SpecialistAppointementDto} from 'src/dto/specialist.dto';
import { Specialist, SpecialistAppointement } from 'src/referentiels/specialist/specialist.entity';

export class SpecialistMapper {
  static mapSpecialistToDto(specialist: Specialist): SpecialistDto {
    const specialistDto: SpecialistDto = {  
      firstName: specialist.firstName,
      lastName: specialist.lastName,
      adresse: specialist.adresse,
      princing: specialist.princing,
      speciality: specialist.speciality,
      appointment: [],
    };

    if (specialist.appointment) {
      specialistDto.appointment = specialist.appointment.map((appointment) => ({
        date: appointment.date,
        hours: appointment.hours,
      }));
    }

    return specialistDto;
  }
}

export class SpecialistAppointementMapper {
  static mapAppointementToDto(appointment: SpecialistAppointement): SpecialistAppointementDto {
    return {
      date: appointment.date,
      hours: appointment.hours,
    };
  }
}

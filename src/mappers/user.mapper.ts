import { UserDto, UserAppointementDto } from 'src/dto/user.dto';
import { SpecialistMapper } from './specialist.mapper';
import { User, UserAppointement } from 'src/user/user.entity';

export class UserMapper {
  static mapToUserDto(user: User): UserDto {
    const userDto: UserDto = {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      sex: user.sex ?? '',
      dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : new Date(0),
      phone: user.phone ?? '',
      email: user.email ?? '',
      appointment: [],
    };

    if (user.appointment) {
      user.appointment.forEach((appointment) => {
        userDto.appointment.push({
          date: appointment.date,
          hours: appointment.hours,
          specialist: SpecialistMapper.mapSpecialistToDto(appointment.specialist),
        });
      });
    }
    return userDto;
  }
}

export class UserAppointementMapper {
  static mapAppointementToDto(appointment: UserAppointement): UserAppointementDto {
    return {
      date: appointment.date,
      hours: appointment.hours,
      specialist: SpecialistMapper.mapSpecialistToDto(appointment.specialist),
    };
  }
}
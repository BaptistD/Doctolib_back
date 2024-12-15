import { SpecialistDto } from './specialist.dto';

export class UserDto {
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: Date;
  phone: string;
  email: string;
  appointment: UserAppointementDto[];
}

export class UserAppointementDto {
  date: Date;
  hours: number;
  specialist: SpecialistDto;
}

export class UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  dateOfBirth: Date;
  phone: string;
  appointment: UserAppointementDto[];
}

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  dateOfBirth: Date;
  phone: string;  
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dto/user.dto';
import { SpecialistMapper, SpecialistAppointementMapper } from 'src/mappers/specialist.mapper';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const userDto: UserDto = {
        firstName: user.firstName,
        lastName: user.lastName,
        sex: user.sex,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone,
        email: user.email,
        appointment: [],
      };

      if (user.appointment) {
        userDto.appointment = user.appointment.map((appointment) => ({
          date: appointment.date,
          hours: appointment.hours,
          specialist: SpecialistMapper.mapSpecialistToDto(appointment.specialist),
        }));
      }
      return userDto;
    }
    return null;
  }

  // Génération du JWT après validation de l'utilisateur
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

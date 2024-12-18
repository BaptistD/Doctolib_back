import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserDto, UserAppointementDto } from 'src/dto/user.dto';
import { Specialist, SpecialistAppointement } from 'src/referentiels/specialist/specialist.entity';
import { UserMapper, UserAppointementMapper } from 'src/mappers/user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Specialist)
    private specialistRepository: Repository<Specialist>,
    private jwtService: JwtService,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const existingUserEmail = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    const existingUserPhone = await this.usersRepository.findOne({
      where: { phone: user.phone },
    });


    if (existingUserEmail) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    if (existingUserPhone) {
      throw new ConflictException('Un utilisateur avec ce numéro de téléphone existe déjà');
    }

    // Hasher le mot de passe avant de sauvegarder l'utilisateur
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneByPhone(phone: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { phone } });
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['appointment'],
    });
  }

  async findProfile(token: string): Promise<User> {
    const decoded = this.jwtService.decode(token) as any; // Decodez le token pour obtenir les informations de l'utilisateur
    const userId = decoded?.sub; // 'sub' est l'ID de l'utilisateur dans le payload
    return this.findById(userId); // Récupérez l'utilisateur par ID
  }

  async updateProfile(token: string, updateUserDto: UserDto): Promise<User> {
    const user = await this.findProfile(token);
    

    if (updateUserDto.appointment) {
      // Récupérer les rendez vous existants en base
      const specialistIds = updateUserDto.appointment.map(
        (specialist) => specialist.specialist.lastName,
      );
      const existingSpecialists =
        await this.specialistRepository.findByIds(specialistIds);

      // Ajouter les specialists existants au profil de l'utilisateur
      // user.appointment = existingSpecialists;
    }

    // Mettre à jour les autres champs du profil si nécessaire
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

}

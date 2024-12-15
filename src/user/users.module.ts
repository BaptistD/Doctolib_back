import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User , UserAppointement} from './user.entity';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import {
  Specialist,
  SpecialistAppointement,
} from 'src/referentiels/specialist/specialist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Specialist, SpecialistAppointement, UserAppointement]),
    JwtModule.register({
      secret: 'your_secret_key', // Remplacez par votre clé secrète
      signOptions: { expiresIn: '60s' }, // Optionnel : temps d'expiration du token
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

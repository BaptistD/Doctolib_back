import { Specialist } from 'src/referentiels/specialist/specialist.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  sex: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Specialist, (specialist) => specialist)

  @OneToMany(() => UserAppointement, (appointment) => appointment.user)
  appointment: UserAppointement[];
}

@Entity('appointment')
export class UserAppointement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  hours: number;

  @ManyToOne(() => Specialist, (specialist) => specialist)
  specialist: Specialist;

  @ManyToOne(() => User, (user) => user)
  user: User;
}

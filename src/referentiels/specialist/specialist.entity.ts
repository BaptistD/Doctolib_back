import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('specialists')
export class Specialist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 200 })
  adresse: string;

  @Column()
  princing: number;

  @Column({ length: 100 })
  speciality: string;

  @OneToMany(() => SpecialistAppointement, (appointment) => appointment, {
    cascade: true,
  })
  appointment: SpecialistAppointement[];
}

@Entity('appointment')
export class SpecialistAppointement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  hours: number;

}

export class SpecialistDto {
  firstName: string;
  lastName: string;
  adresse: string;
  princing: number;
  speciality: string;
  appointment: SpecialistAppointementDto[];
}

export class SpecialistAppointementDto {
  date: Date;
  hours: number;
}

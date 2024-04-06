export enum AppointmentTypeEnum {
  TELEPHONE = 'telephone',
  FACE_TO_FACE = 'face_to_face',
}
export class Appointment {
  constructor(
    private readonly patientId: number,
    private readonly appointmentDate: Date,
    private readonly appointmentType: AppointmentTypeEnum,
    private readonly confirmed: boolean,
  ) {}

  getDate(): Date {
    return this.appointmentDate;
  }

  getType(): AppointmentTypeEnum {
    return this.appointmentType;
  }

  isConfirmed(): boolean {
    return this.confirmed;
  }
}

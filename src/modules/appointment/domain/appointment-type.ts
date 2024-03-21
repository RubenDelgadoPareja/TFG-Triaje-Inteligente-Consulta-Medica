export enum AppointmentTypeEnum {
  TELEPHONE = 'telephone',
  FACE_TO_FACE = 'face_to_face',
}

export interface AppointmentTypeProps {
  type: AppointmentTypeEnum;
}

export class AppointmentType {
  constructor(private readonly type: AppointmentTypeEnum) {}

  public get value(): AppointmentTypeEnum {
    return this.type;
  }
}

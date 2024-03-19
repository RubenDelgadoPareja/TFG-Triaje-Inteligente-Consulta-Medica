import { ValueObject } from '../../shared/domain/value-object';

export enum AppointmentTypeEnum {
  TELEPHONE = 'telephone',
  FACE_TO_FACE = 'face_to_face',
}

export interface AppointmentTypeProps {
  type: AppointmentTypeEnum;
}

export class AppointmentType extends ValueObject<AppointmentTypeProps> {
  constructor(props: AppointmentTypeProps) {
    super(props);
  }

  public static create(props: AppointmentTypeProps): AppointmentType {
    return new AppointmentType(props);
  }

  public get value(): AppointmentTypeEnum {
    return this.props.type;
  }
}

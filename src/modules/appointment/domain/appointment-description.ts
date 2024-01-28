import { ValueObject } from '../../shared/domain/value-object';

export interface AppointmentDescriptionProps {
  description: string;
}

// We will have to crypt this data before saving it to the database
export class AppointmentDescription extends ValueObject<AppointmentDescriptionProps> {
  public static maxLength = 255;

  private constructor(props: AppointmentDescriptionProps) {
    super(props);
  }

  public static create(
    props: AppointmentDescriptionProps,
  ): AppointmentDescription {
    if (!AppointmentDescription.isValid(props.description)) {
      throw new Error(`The description <${props.description}> is invalid`);
    }
    return new AppointmentDescription(props);
  }

  get value(): string {
    return this.props.description;
  }

  public static isValid(description: string): boolean {
    return description.length <= this.maxLength;
  }
}

import { Entity } from '../../shared/domain/entity';
import { UniqueEntityID } from '../../shared/domain/unique-entity-id';

export class AppointmentId extends Entity<{ value: UniqueEntityID }> {
  constructor(value: UniqueEntityID) {
    super({ value });
  }

  public static create(id: UniqueEntityID): AppointmentId {
    return new AppointmentId(id);
  }

  get value(): UniqueEntityID {
    return this.props.value;
  }

  get valueString(): string {
    return this.props.value.toString();
  }
}

import { UniqueEntityID } from '../../shared/domain/unique-entity-id';
import { ValueObject } from '../../shared/domain/value-object';

export class PatientId extends ValueObject<{ value: UniqueEntityID }> {
  private constructor(value: UniqueEntityID) {
    super({ value });
  }

  public static create(id: UniqueEntityID): PatientId {
    return new PatientId(id);
  }

  getValue(): UniqueEntityID {
    return this.props.value;
  }

  getValueString(): string {
    return this.props.value.toString();
  }
}

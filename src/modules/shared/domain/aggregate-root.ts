import { Entity } from './entity';
import { IDomainEvent } from './events/domain-event';

/**
 * @description
 * AggregateRoot is a special Entity that is the root of an Aggregate.
 * It is responsible for keeping track of changes in its internal state.
 * It is also responsible for publishing DomainEvents when its internal state changes.
 */
export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get id() {
    return this._id;
  }

  get domainEvents() {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent) {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents() {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}

export default AggregateRoot;

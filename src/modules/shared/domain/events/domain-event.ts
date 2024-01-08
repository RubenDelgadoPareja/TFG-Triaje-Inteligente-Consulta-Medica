/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AggregateRoot from '../aggregate-root';
import { UniqueEntityID } from '../unique-entity-id';

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
}

export class DomainEvents {
  private static handlersMap: {
    [key: string]: ((event: IDomainEvent) => void)[];
  } = {};
  private static markedAggregates: AggregateRoot<any>[] = [];

  public static register(
    callback: (event: IDomainEvent) => void,
    eventClassName: string,
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }

    this.handlersMap[eventClassName].push(callback);
  }

  private static dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      handlers.forEach((handler) => handler(event));
    }
  }

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateById(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private static clearHandlers(): void {
    this.handlersMap = {};
  }

  private static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateById(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) =>
      this.dispatch(event),
    );
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>,
  ): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  private static findMarkedAggregateById(
    id: UniqueEntityID,
  ): AggregateRoot<any> | null {
    let found: AggregateRoot<any> | null = null;
    this.markedAggregates.forEach((aggregate) => {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    });

    return found;
  }
}

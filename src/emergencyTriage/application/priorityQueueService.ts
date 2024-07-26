import { PriorityQueue } from '../domain/priorityQueue';

export class PriorityQueueService {

    constructor(
        private readonly priorityQueue: PriorityQueue,
    ) {}

    isEmpty(): boolean {
        return this.priorityQueue.isEmpty();
    }

    peek() {
        return this.priorityQueue.peek();
    }
}

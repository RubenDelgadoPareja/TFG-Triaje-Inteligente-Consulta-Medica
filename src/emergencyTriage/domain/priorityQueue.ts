import { Turn } from "./turn";

export class PriorityQueue{
    private heap: Turn[];

    constructor() {
        this.heap = [];
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    peek(): Turn | null  {
        return this.isEmpty() ? null : this.heap[0];
    }

    insert(turn: Turn): void {
        this.heap.push(turn);
    }

}

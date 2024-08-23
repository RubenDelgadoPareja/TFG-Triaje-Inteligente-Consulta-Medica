import { Turn } from "./turn";

export class TriageQueue {
    private static readonly LEFT_OFFSET: number = 1;
    private static readonly RIGHT_OFFSET: number = 2;

    private heap: Turn[];

    constructor() {
        this.heap = [];
    }

    private left(index: number): number {
        // We use the offset to calculate the left child index
        return 2 * index + TriageQueue.LEFT_OFFSET;
    }

    private right(index: number): number {
        // We use the offset to calculate the right child index
        return 2 * index + TriageQueue.RIGHT_OFFSET;
    }

    private parent(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private swap(index1: number, index2: number): void {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    private prioritizeUp(index: number): void {
        while (index > 0 && this.heap[this.parent(index)].priority < this.heap[index].priority) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    private prioritizeDown(index: number): void {
        let maxIndex = index;
        const left = this.left(index);
        const right = this.right(index);

        if (left < this.heap.length && this.heap[left].priority > this.heap[maxIndex].priority) {
            maxIndex = left;
        }
        if (right < this.heap.length && this.heap[right].priority > this.heap[maxIndex].priority) {
            maxIndex = right;
        }
        if (index !== maxIndex) {
            this.swap(index, maxIndex);
            this.prioritizeDown(maxIndex);
        }
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    nextPatientToProcess(): Turn | null  {
        return this.isEmpty() ? null : this.heap[0];
    }

    addTurnToQueue(turn: Turn): void {
        this.heap.push(turn);
        this.prioritizeUp(this.heap.length - 1);
    }

    processNextTurn(): Turn | null {
        if (this.isEmpty()) {
            return null;
        }

        const root = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length > 0 && last) {
            this.heap[0] = last;
            this.prioritizeDown(0);
        }

        return root;
    }
}

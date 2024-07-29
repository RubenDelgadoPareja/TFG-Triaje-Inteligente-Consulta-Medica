import { Turn } from "./turn";

export class PriorityQueue{
    private heap: Turn[];

    constructor() {
        this.heap = [];
    }

    private left(index: number):number
    {
        return  2 * index + 1
    }

    private right(index: number): number {
        return 2 * index + 2;
    }

    private parent(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private swap(index1: number, index2: number): void {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    private bubbleUp(index: number): void {
        while (index > 0 && this.heap[this.parent(index)].getPriority() < this.heap[index].getPriority()) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    private bubbleDown(index: number): void {
        let maxIndex = index;
        const left = this.left(index);
        const right = this.right(index);
        if (left < this.heap.length && this.heap[left].getPriority() > this.heap[maxIndex].getPriority()) {
            maxIndex = left;
        }
        if (right < this.heap.length && this.heap[right].getPriority() > this.heap[maxIndex].getPriority()) {
            maxIndex = right;
        }
        if (index !== maxIndex) {
            this.swap(index, maxIndex);
            this.bubbleDown(maxIndex);
        }
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    peek(): Turn | null  {
        return this.isEmpty() ? null : this.heap[0];
    }

    insert(turn: Turn): void {
        this.heap.push(turn);
        this.bubbleUp(this.heap.length - 1);
    }

    pop(): Turn | null {
        if (this.isEmpty()) {
            return null;
        }

        const root = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length > 0 && last) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }

        return root;

    }

}

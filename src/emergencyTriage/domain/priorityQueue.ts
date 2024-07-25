
class PriorityNode<T>{
    constructor(
        private readonly value: T,
        private readonly next: PriorityNode<T>
    ) {}
}

export class PriorityQueue<T> {
    constructor(
        private readonly head: PriorityNode<T>,
        private readonly tail: PriorityNode<T>,
    ) {}
}

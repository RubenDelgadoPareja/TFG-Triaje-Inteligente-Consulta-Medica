import { RiskEnum, Turn } from "../../turn/domain/turn";

class PriorityNode{
    constructor(
        private readonly value: Turn,
        private readonly priority: RiskEnum,
        private readonly next: PriorityNode
    ) {}
}

export class PriorityQueue {
    constructor(
        private readonly head: PriorityNode,
        private readonly tail: PriorityNode,
    ) {}
}

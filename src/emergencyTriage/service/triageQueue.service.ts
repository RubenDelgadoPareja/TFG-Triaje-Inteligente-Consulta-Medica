import { Injectable } from "@nestjs/common";
import { TriageQueue } from "../domain/triageQueue";

@Injectable()
export class TriageQueueService {
    constructor() {}

    instanceTriageQueue(): TriageQueue{
        return new TriageQueue();
    }
}

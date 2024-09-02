import { TriageQueue } from "../../domain/triageQueue";
import { TriageQueueService } from "../../service/triageQueue.service";


describe('Triage Queue Service', () => {
    let triageQueueService: TriageQueueService;

    beforeEach(() => {
        triageQueueService = new TriageQueueService();
    });

    test('should instance a triage queue', () => {
        const result = triageQueueService.instanceTriageQueue();

        expect(result).toBeInstanceOf(TriageQueue);
        expect(result).toEqual({heap: []});
    });

});

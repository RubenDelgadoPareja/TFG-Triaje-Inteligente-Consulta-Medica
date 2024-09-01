import { TriageQueue } from "../../domain/triageQueue";
import { Turn } from "../../domain/turn";
import { getTurn } from "../../mocks/getTurn.mock";


describe("Triage queue", () => {
    test("given 50 patients with different priorities it should take less than X time to insert and order by priority", () => {
        const turnQueue: Turn[] = [];
        for (let i = 0; i < 50; i++) {
            turnQueue.push(getTurn());
        }

        const queue = new TriageQueue();

        // Medir el tiempo de inserción
        console.time('Inserción de pacientes');
        turnQueue.forEach(turn =>{ {
            queue.addTurnToQueue(turn)}});
        console.timeEnd('Inserción de pacientes');

        // Verificar la correcta priorización
        let lastPriority = 100;
        console.time('Procesamiento de pacientes');
        while (!queue.isEmpty()) {
            const turn = queue.processNextTurn();
            expect(turn?.priority).toBeLessThanOrEqual(lastPriority);
            lastPriority = turn?.priority ?? 100;
        }
        console.timeEnd('Procesamiento de pacientes');
    });
});

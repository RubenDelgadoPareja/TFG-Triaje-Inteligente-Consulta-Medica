
export class MedicalForm {
    private constructor(
        private readonly id: number,
        private readonly patientId: number,
        private readonly reason: string,
        private readonly discriminatory: string,
        private readonly symptoms: string,
        // private readonly vitalSigns: unknown,
        private readonly diagnosis: string
    ) {}

}

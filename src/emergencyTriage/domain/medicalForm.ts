import { Patient } from "./patient";

export class MedicalForm {
    constructor(
        private readonly patient: Patient,
        private readonly reason: string,
        private readonly discriminators: string,
        private readonly symptoms: string,
        private readonly vitalSigns: string,
        private readonly diagnosis: string,
    ) {}

}

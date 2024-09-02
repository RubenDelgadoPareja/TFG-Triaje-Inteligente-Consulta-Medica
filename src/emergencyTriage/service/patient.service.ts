import { Injectable } from "@nestjs/common";
import { PatientProps, Patient } from "../domain/patient";

@Injectable()
export class PatientService {
    constructor() {}

    createPatient(props: PatientProps): Patient{
        return new Patient({
            name: props.name,
            dni: props.dni,
            age: props.age,
            genre: props.genre
        });
    }
}

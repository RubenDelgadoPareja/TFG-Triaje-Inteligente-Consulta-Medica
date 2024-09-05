import { GenreEnum, PatientProps } from './../domain/patient';
import { Patient } from "../domain/patient";
import { faker } from '@faker-js/faker';
import { Dni } from '../domain/dni';

export const getDni = (dni?: Dni): Dni => {
    // Generar 8 dígitos aleatorios
    const numeroDni = faker.number.int({ min: 10000000, max: 99999999 });

    // Calcular la letra del DNI
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    const letra = letras[numeroDni % 23];
    return dni ?? new Dni(`${numeroDni}${letra}`);
}


export const getPatient = (id?: number, name?: string, dni?: Dni, age?: number, genre?: GenreEnum) => {
    const patientProps: PatientProps = {
        id: id ?? undefined,
        name: name ?? faker.internet.userName(),
        dni: dni ?? getDni(),
        age: age ?? Math.floor(Math.random() * 100),
        genre: genre ?? faker.helpers.enumValue(GenreEnum),
    }

    return new Patient(patientProps)
}

import { Patient } from "../domain/patient";
import { faker } from '@faker-js/faker';

export const getPatient = (name?: string, dni?: string) => {
    return new Patient(
        name ?? faker.internet.userName(),
        dni ?? faker.string.numeric(),
    )
}

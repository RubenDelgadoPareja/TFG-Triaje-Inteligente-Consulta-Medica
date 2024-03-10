import { Patient } from '../../modules/patient/domain/patient';
import { UniqueEntityID } from '../../modules/shared/domain/unique-entity-id';

// Test de prueba para la configuración de la herramienta
describe('Patiente', () => {
  test('Create patient', () => {
    const id = new UniqueEntityID();
    const patient = Patient.create({ id });
    expect(patient).toBeInstanceOf(Patient);
  });
});

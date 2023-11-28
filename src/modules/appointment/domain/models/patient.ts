import { Appointment } from './appointment';
import { HealthRiskEnum } from './risk';

export class Patient {
  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly email: string,
    public readonly dni: string,
    public readonly socialSecurityNumber: number,
    public readonly risk: HealthRiskEnum,
    public readonly hasAppointment: boolean,
    public readonly medicalHistory: Appointment[],
  ) {}

  private validateDni(): boolean {
    const regexDni: RegExp = /^[0-9]{8}[A-Za-z]$/;
    return regexDni.test(this.dni);
  }

  private validateSocialSecurityCard(): boolean {
    const regexSocialSecurity: RegExp = /^[0-9]{12}$/;
    return regexSocialSecurity.test(this.socialSecurityNumber.toString());
  }
}

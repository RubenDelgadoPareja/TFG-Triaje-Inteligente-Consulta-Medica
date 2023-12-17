import { Entity } from '../../../shared/domain/entity';
import { Appointment } from '../../appointment/domain/appointment';
import { HealthRisk } from './risk';

export interface PatientProps {
  id: number;
  fullName: string;
  email: string;
  dni: string;
  socialSecurityNumber: number;
  risk: HealthRisk;
  hasAppointment: boolean;
  medicalHistory: Appointment[];
}

export class Patient extends Entity<PatientProps> {
  get name(): string {
    return this.props.fullName;
  }

  get risk(): HealthRisk {
    return this.props.risk;
  }

  get dni(): string {
    return this.props.dni;
  }

  get socialSecurityNumber(): number {
    return this.props.socialSecurityNumber;
  }
  private validateDni(): boolean {
    const regexDni: RegExp = /^[0-9]{8}[A-Za-z]$/;
    return regexDni.test(this.dni);
  }

  private validateSocialSecurityCard(): boolean {
    const regexSocialSecurity: RegExp = /^[0-9]{12}$/;
    return regexSocialSecurity.test(this.socialSecurityNumber.toString());
  }
}

export enum HealthRiskEnum {
  LOW = 'Low',
  MID = 'Middle',
  HIGH = 'High',
}

export class HealthRisk {
  constructor(
    private readonly id: HealthRiskEnum,
    private readonly label: string,
  ) {}
}

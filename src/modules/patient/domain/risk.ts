import { ValueObject } from '../../../shared/domain/value-object';

enum HealthRiskEnum {
  LOW = 'Low',
  MID = 'Middle',
  HIGH = 'High',
}

interface HeatghRiskProps {
  id: HealthRiskEnum;
  label: string;
}

export class HealthRisk extends ValueObject<HeatghRiskProps> {
  get label(): string {
    return this.props.label;
  }
}

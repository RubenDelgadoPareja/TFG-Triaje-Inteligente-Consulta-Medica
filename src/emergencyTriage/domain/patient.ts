import { Dni } from "./dni";

export enum GenreEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export interface PatientProps {
  name: string;
  dni: Dni;
  age: number;
  genre: GenreEnum;
}

export class Patient {
  private readonly _props: PatientProps;

  constructor(props: PatientProps
  ){
    this._props = props;
  }

  get name(): string {
    return this._props.name;
  }

  get dni(): Dni {
    return this._props.dni;
  }

  get age(): number {
    return this._props.age;
  }

  get genre(): GenreEnum {
    return this._props.genre;
  }
}

import { Fare } from './Fare';

export interface Zone {
  name: string;
  zone: number;
  fares: Array<Fare>;
}

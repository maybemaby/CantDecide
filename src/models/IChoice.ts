import { IScoredFactor } from "./IFactor";

export interface IChoice {
  title: string;
  id: number;
  description?: string;
  chosen: boolean;
  factors: IScoredFactor[];
}

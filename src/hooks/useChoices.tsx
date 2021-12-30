import { useState } from "react";
import { IChoice } from "../models/IChoice";
import { IFactor } from "../models/IFactor";

export const useChoices = (globalFactors: IFactor[]): [IChoice[]] => {
  const [choices, setChoices] = useState<IChoice[]>([]);

  return [choices];
};

import { useState } from "react";
import { IChoice } from "../models/IChoice";
import { IFactor } from "../models/IFactor";

export const useChoices = (
  globalFactors: IFactor[]
): [IChoice[], (choice: IChoice) => void] => {
  const [choices, setChoices] = useState<IChoice[]>([]);

  const addChoice = (choice: IChoice): void => {
    setChoices([...choices, choice]);
  };

  return [choices, addChoice];
};

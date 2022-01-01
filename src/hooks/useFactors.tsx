import { useState, useEffect } from "react";
import { IFactor } from "../models/IFactor";

export type EditFactorsFunc = (factor: IFactor) => void;

export const useFactors = (): [IFactor[], EditFactorsFunc, EditFactorsFunc] => {
  const [factors, setFactors] = useState<IFactor[]>([]);

  const calcWeights = (factorList: IFactor[]): IFactor[] => {
    const totalWeight = factorList.reduce((prev: number, current): number => {
      return prev + current.weight.assignedScore;
    }, 0);
    const updatedFactors = factorList.map((factor: IFactor): IFactor => {
      return {
        ...factor,
        weight: {
          assignedScore: factor.weight.assignedScore,
          trueWeighting:
            Math.round((factor.weight.assignedScore / totalWeight) * 1e3) / 1e3,
        },
      };
    });
    return updatedFactors;
  };

  const addFactor = (factor: IFactor): void => {
    const newFactors = [...factors];
    newFactors.push(factor);
    const weightedFactors = calcWeights(newFactors);
    setFactors(weightedFactors);
  };

  const removeFactor = (factor: IFactor): void => {
    const newFactors = factors.filter((insideFactor: IFactor): boolean => {
      return !(insideFactor.title === factor.title);
    });
    const weightedFactors = calcWeights(newFactors);
    setFactors(weightedFactors);
  };

  return [factors, addFactor, removeFactor];
};

interface Weight {
  assignedScore: number;
  trueWeighting?: number;
}

export interface IFactor {
  title: string;
  score: number;
  trueScore: number;
  weight: Weight;
}
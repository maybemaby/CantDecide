interface Weight {
  assignedScore: number;
  trueWeighting?: number;
}

export interface IFactor {
  title: string;
  weight: Weight;
}

export interface IScoredFactor extends IFactor {
  score?: number;
  trueScore?: number;
}

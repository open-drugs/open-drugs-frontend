// TODO: Check if out-of-date

import { Item, Float } from './basic-types.model';

export interface Experiment {
  id: number;
  species: Item;
  strain: {
    id: number;
    name: string;
  };
  sex: string;
  lifespan: {
    min: Float;
    med: Float;
    avg: Float;
    max: Float;
    unit: string;
  };
  lifespanChangePercent: {
    min: Float;
    med: Float;
    avg: Float;
    max: Float;
  };
  doi: string;
  year: number;
  cohortSize: number;
  pmid: number;
  interventionType: Item;
  survivalDataAvailable: boolean;
  rawDataAvailable: boolean;
  intervention: {
    drugIntervention: {
      drug: Item;
      dosage: string;
      delivery: {
        option: string;
        mean: string;
        regime: string;
      };
      exposure: {
        startLifespanPercent: number;
        endLifespanPercent: number;
        startingPoint: string;
      };
    };
    dietIntervention: any;
  };
  conditions: {
    feed: string;
    temperature: {
      from: string;
      to: number;
    };
    light: {
      light: number;
      dark: string;
    };
    density: {
      count: number;
      container: number;
    };
  };
}

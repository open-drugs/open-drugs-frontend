type float = number;

type Item = {
  id: number;
  name: string;
}

export interface Experiment {
  id: number;
  species: Item;
  strain: {
    id: number;
    name: string;
  };
  sex: string;
  lifespan: {
    med: float;
    avg: float;
    max: float;
    unit: string
  };
  doi: string;
  year: number;
  cohortSize: number;
  pmid: number;
  interventionType: Item;
  survivalDataAvailable: boolean;
  rawDataAvailable: boolean;
  checked: boolean;
  intervention: {
    drugIntervention: {
      drug: Item,
      dosage: string,
      delivery: {
        option: string,
        mean: string,
        regime: string
      },
      exposure: {
        startLifespanPercent: number,
        endLifespanPercent: number,
        startingPoint: string
      }
    },
    dietIntervention: any
  };
  conditions: {
    feed: string,
    temperature: {
      from: string,
      to: number
    },
    light: {
      light: number,
      dark: string
    },
    density: {
      count: number,
      container: number
    }
  };
}


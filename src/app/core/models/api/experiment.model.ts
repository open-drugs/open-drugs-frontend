export interface Experiment {
  id: number;
  species: {
    id: number;
    name: string;
  };
  strain: {
    id: number;
    name: string;
  };
  sex: string;
  lifespan: {
    med: number;
    avg: number;
    max: number;
    unit: string
  };
  doi: string;
  year: number;
  cohortSize: number;
  pmid: number;
  interventionType: {
    id: number,
    name: string
  };
  survivalDataAvailable: boolean;
  rawDataAvailable: boolean;
  checked: boolean;
  intervention: {
    drugIntervention: {
      drug: {
        id: number,
        name: string
      },
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


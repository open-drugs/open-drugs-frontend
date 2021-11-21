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
  conditions: {
    feed: string;
    temperature: {
      from: number;
      to: number;
    };
    light: {
      light: number;
      dark: number;
    }
  }
}

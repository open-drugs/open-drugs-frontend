export interface FilterParams {
  byInterventionType: any[];
  byIntervention: any[];
  bySpecies: any[];
  byStrain: any[];
  byAvgLifespanChangePercent: any; // TODO: typing
  byMaxLifespanChangePercent: any;
  byAvgLifespan: any;
  byMaxLifespan: any;
  byYear: number[];
}

export type FilterTypes =
  | 'byInterventionType'
  | 'byIntervention'
  | 'bySpecies'
  | 'byStrain'
  | 'byAvgLifespanChangePercent'
  | 'byMaxLifespanChangePercent'
  | 'byAvgLifespan'
  | 'byMaxLifespan'
  | 'byYear';

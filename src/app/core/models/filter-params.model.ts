export interface FilterParamsModel {
  interventionType: any;
  intervention: any[];
  species: any;
  strain: any[];
  avgLifespanChangePercent: any; // TODO: typing
  maxLifespanChangePercent: any;
  avgLifespan: any;
  maxLifespan: any;
  year: number[];
}

export type FilterTypes =
  | 'interventionType'
  | 'intervention'
  | 'species'
  | 'strain'
  | 'avgLifespanChangePercent'
  | 'maxLifespanChangePercent'
  | 'avgLifespan'
  | 'maxLifespan'
  | 'year';

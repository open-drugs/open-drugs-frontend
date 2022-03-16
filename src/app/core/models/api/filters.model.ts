import { FilterRange, Item } from './basic-types.model';

export type Intervention = Partial<Item> & { type: string; };

export interface Filters {
  interventionType: {
    id: number;
    name: 'control' | 'drug' | 'diet';
  }[];
  intervention: Intervention[];
  species: Item[];
  strain: Item[];
  avgLifespanChangePercent: Omit<FilterRange, 'unit'>;
  maxLifespanChangePercent: Omit<FilterRange, 'unit'>;
  avgLifespan: FilterRange;
  maxLifespan: FilterRange;
  year: number[];
}

import { Item } from './basic-types.model';

export type Intervention = Partial<Item> & { type: string; };

export interface Filters {
  interventionType: {
    id: number;
    name: 'control' | 'drug' | 'diet';
  }[]
  intervention: Intervention[];
  species: Item[];
  strain: Item[];
  avgLifespanChangePercent: Omit<Range, 'unit'>;
  maxLifespanChangePercent: Omit<Range, 'unit'>;
  avgLifespan: Range;
  maxLifespan: Range;
  year: number[];
}

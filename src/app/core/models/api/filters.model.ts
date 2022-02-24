import { Item } from './basic-types.model';

export interface Filters {
  interventionType: {
    id: number;
    name: 'control' | 'drug' | 'diet';
  }[]
  intervention: Partial<Item> & { type: string; }[];
  species: Item[];
  strain: Item[];
  avgLifespanChangePercent: Omit<Range, 'unit'>;
  maxLifespanChangePercent: Omit<Range, 'unit'>;
  avgLifespan: Range;
  maxLifespan: Range;
  year: number[];
}

import { Filters } from './filters.model';

export interface ApiResponse<T> {
  items: T[];
  filters: Filters;
  options: PageOptions;
}

export interface PageOptions {
  objTotal: number;
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pagesTotal?: number;
}

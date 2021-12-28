export interface ApiResponse<T> {
  items: T[];
  filters: any;
  options: PageOptions;
}

export interface PageOptions {
  objTotal: number;
  pagination: {
    page: number,
    pageSize: number,
    pagesTotal: number
  };
}

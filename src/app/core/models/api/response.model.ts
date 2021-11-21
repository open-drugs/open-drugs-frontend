export interface ApiResponse<T> {
  items: T[];

  options: {
    objTotal: number,
    pagination: {
      page: number,
      pageSize: number,
      pagesTotal: number
    }
  }
}

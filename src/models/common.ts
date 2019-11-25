export interface Pagination {
  offset: number;
  size: number;
  total: number;
}

export interface Paginated<T> {
  data: T[],
  pagination: Pagination;
}

export interface IResource<K> {
  id: K;
}

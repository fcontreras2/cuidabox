export interface PaginatedMeta {
  limit: number;
  hasMore: boolean;
  nextCursor?: string;
  total?: number;
  offset?: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginatedMeta;
}

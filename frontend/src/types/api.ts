/** Estrutura de paginação retornada pelo Spring Data. */
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PageRequest {
  [key: string]: string | number | boolean | string[] | undefined;
  page?: number;
  size?: number;
  sort?: string | string[];
}

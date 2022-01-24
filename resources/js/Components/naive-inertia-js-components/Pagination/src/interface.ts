export interface LaravelPaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface LaravelPagination<T = any> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LaravelPaginationLink[];
  next_page_url: string;
  path: string;
  per_page: number | string;
  prev_page_url: string;
  to: number;
  total: number;
}

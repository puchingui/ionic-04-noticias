export interface ResponseNews {
  pagination?: Pagination;
  data?:       Article[];
}

export interface Article {
  author?:       null | string;
  title?:        string;
  description?:  string;
  url?:          string;
  source?:       string;
  image?:        null | string;
  category?:     string;
  language?:     string;
  country?:      string;
  published_at?: Date;
}

export interface Pagination {
  limit?:  number;
  offset?: number;
  count?:  number;
  total?:  number;
}

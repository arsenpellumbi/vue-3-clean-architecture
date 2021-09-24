import { Pagination } from 'app.core/types';
import { FetchingStoreState, IFetchingStore } from '.';

export interface PaginatedStoreState extends FetchingStoreState {
  pagination: Pagination;
}

export interface IPaginatedStore extends IFetchingStore {
  readonly currentPagination: Pagination;
}

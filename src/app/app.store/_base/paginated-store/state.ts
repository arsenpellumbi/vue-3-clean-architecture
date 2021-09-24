import { PaginatedStoreState } from 'app.core/interfaces/stores';
import { useState as useFetchingStoreState } from '../fetching-store/state';

export const useState = (): PaginatedStoreState => ({
  ...useFetchingStoreState(),
  pagination: {
    pageIndex: 0,
    pageSize: 12,
    totalCount: 0,
    totalPages: 0,
  },
});

import { MutationTree } from 'vuex';
import { useMutations as useFetchingMutations } from '../fetching-store/mutations';
import { PaginatedStoreState } from 'app.core/interfaces/stores';
import { Pagination } from 'app.core/types';

export const useMutations = (): MutationTree<PaginatedStoreState> => ({
  ...useFetchingMutations(),
  setPagination(state: PaginatedStoreState, pagination: Pagination): void {
    state.pagination = pagination;
  },

  addPaginationItems(state: PaginatedStoreState, count: number): void {
    state.pagination = {
      ...state.pagination,
      totalCount: state.pagination.totalCount + count,
      totalPages: Math.ceil(state.pagination.totalCount / state.pagination.pageSize),
    };
  },

  removePaginationItems(state: PaginatedStoreState, count: number): void {
    state.pagination = {
      ...state.pagination,
      totalCount: state.pagination.totalCount - count,
      totalPages: Math.ceil(state.pagination.totalCount / state.pagination.pageSize),
      pageIndex:
        state.pagination.pageIndex >= state.pagination.totalPages
          ? state.pagination.totalPages - 1
          : state.pagination.pageIndex,
    };
  },
});

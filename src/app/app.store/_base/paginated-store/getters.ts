import { GetterTree } from 'vuex';
import { useGetters as useFetchingGetters } from '../fetching-store/getters';
import { PaginatedStoreState, AppStoreState } from 'app.core/interfaces/stores';
import { Pagination } from 'app.core/types';

export const useGetters = (): GetterTree<PaginatedStoreState, AppStoreState> => ({
  ...useFetchingGetters(),
  currentPagination(state: PaginatedStoreState): Pagination {
    return state.pagination;
  },
});

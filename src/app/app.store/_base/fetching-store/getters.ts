import { FetchingStoreState, AppStoreState } from 'app.core/interfaces/stores';
import { GetterTree } from 'vuex';

export const useGetters = (): GetterTree<FetchingStoreState, AppStoreState> => ({
  fetching(state: FetchingStoreState): boolean {
    return state.fetching;
  },
});

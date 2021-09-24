import { FetchingStoreState } from 'app.core/interfaces/stores';
import { MutationTree } from 'vuex';

export const useMutations = (): MutationTree<FetchingStoreState> => ({
  setFetching(state: FetchingStoreState, fetching: boolean): void {
    state.fetching = fetching;
  },
});

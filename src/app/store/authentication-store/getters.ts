import { User } from '~/core/models';
import { AuthenticationStoreState, AppStoreState } from '~/core/interfaces/stores';
import { GetterTree } from 'vuex';

export const useGetters = (): GetterTree<AuthenticationStoreState, AppStoreState> => ({
  user(state: AuthenticationStoreState): User | null {
    return state.user;
  },

  isAuthenticating(state: AuthenticationStoreState): boolean {
    return state.isAuthenticating;
  },
});

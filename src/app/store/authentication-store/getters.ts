import { User } from 'app.core/models';
import { AuthenticationStoreState, AppStoreState } from 'app.core/interfaces/stores';
import { GetterTree } from 'vuex';

export const useGetters = (): GetterTree<AuthenticationStoreState, AppStoreState> => ({
  user(state: AuthenticationStoreState): User | null {
    return state.user;
  },

  isAuthenticating(state: AuthenticationStoreState): boolean {
    return state.isAuthenticating;
  },
});

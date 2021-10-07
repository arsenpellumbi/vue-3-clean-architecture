import { MutationTree } from 'vuex';
import { User } from '~/core/models';
import { AuthenticationStoreState } from '~/core/interfaces/stores';

export const useMutations = (): MutationTree<AuthenticationStoreState> => ({
  setUser(state: AuthenticationStoreState, user: User | null): void {
    state.user = user;
  },

  setIsAuthenticating(state: AuthenticationStoreState, isAuthenticating: boolean): void {
    state.isAuthenticating = isAuthenticating;
  },
});

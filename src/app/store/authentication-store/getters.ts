import { User } from '~/core/models/user.model';
import { GetterTree } from 'vuex';
import { AppStoreState } from '../app-store';
import { AuthenticationStoreState } from './state';

export const useGetters = (): GetterTree<AuthenticationStoreState, AppStoreState> => ({
  user(state: AuthenticationStoreState): User | null {
    return state.user;
  },

  isAuthenticating(state: AuthenticationStoreState): boolean {
    return state.isAuthenticating;
  },
});

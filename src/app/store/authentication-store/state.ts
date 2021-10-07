import { AuthenticationStoreState } from '~/core/interfaces/stores';

export const useState = (): AuthenticationStoreState => ({
  user: null,
  isAuthenticating: false,
});

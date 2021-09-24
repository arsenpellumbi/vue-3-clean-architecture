import { AuthenticationStoreState } from 'app.core/interfaces/stores';

export const useState = (): AuthenticationStoreState => ({
  user: null,
  isAuthenticating: false,
});

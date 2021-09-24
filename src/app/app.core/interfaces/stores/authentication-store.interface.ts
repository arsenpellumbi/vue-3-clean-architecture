import { User } from 'app.core/models';
import { IBaseStore } from '.';

export interface AuthenticationStoreState {
  user: User | null;
  isAuthenticating: boolean;
}

export interface IAuthenticationStore extends IBaseStore {
  readonly user: User | null;
  readonly isAuthenticating: boolean;
  login(returnPath: string): Promise<void>;
  logout(): Promise<void>;
  authenticate(returnPath: string): Promise<void>;
  isUserLoggedIn(): Promise<boolean>;
  signinRedirectCallback(returnPath: string): Promise<void>;
  signoutRedirectCallback(returnPath: string): Promise<void>;
  signinSilentCallback(): Promise<void>;
  reset(): Promise<void>;
}

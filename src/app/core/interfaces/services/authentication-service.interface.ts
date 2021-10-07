import { User } from 'app.core/models';

export interface IAuthenticationService {
  getUser(): Promise<User>;
  login(returnPath: string): Promise<User>;
  logout(): Promise<void>;
  getAccessToken(): Promise<string | null>;
  isUserLoggedIn(): Promise<boolean>;
  signinRedirectCallback(returnPath: string): Promise<User>;
  signoutRedirectCallback(returnPath: string): Promise<void>;
  signinSilentCallback(): Promise<User>;
}

import {
  GetUserPayloadResult,
  LoginPayloadResult,
  SignInRedirectCallbackPayloadResult,
  SignInSilentCallbackPayloadResult
} from '../payloads-result';

export interface IAuthenticationService {
  getUser(): Promise<GetUserPayloadResult>;
  login(returnPath: string): Promise<LoginPayloadResult>;
  logout(): Promise<void>;
  getAccessToken(): Promise<string | null>;
  isUserLoggedIn(): Promise<boolean>;
  signinRedirectCallback(returnPath: string): Promise<SignInRedirectCallbackPayloadResult>;
  signoutRedirectCallback(returnPath: string): Promise<void>;
  signinSilentCallback(): Promise<SignInSilentCallbackPayloadResult>;
}

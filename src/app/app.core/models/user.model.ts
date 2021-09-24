import {
  GetUserPayloadResult,
  SignInRedirectCallbackPayloadResult,
  SignInSilentCallbackPayloadResult,
} from 'app.core/interfaces/payloads-result';

export class User {
  readonly username: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly authToken: string;
  readonly authenticated: boolean;

  constructor();
  constructor(
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    authToken: string,
    authenticated: boolean
  );
  constructor(
    username?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    authToken?: string,
    authenticated?: boolean
  ) {
    this.username = username || '';
    this.email = email || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.authToken = authToken || '';
    this.authenticated = authenticated || false;
  }

  public static mapFromGetUserPayloadResult(data: GetUserPayloadResult): User | null {
    if (!data) return null;
    return new User(
      data.profile.nickname || '',
      data.profile.email || '',
      data.profile.name || '',
      data.profile.family_name || '',
      data.access_token || '',
      !!data.access_token
    );
  }

  public static mapFromSignInRedirectCallbackPayloadResult(data: SignInRedirectCallbackPayloadResult): User | null {
    if (!data) return null;
    return new User(
      data.profile.nickname || '',
      data.profile.email || '',
      data.profile.name || '',
      data.profile.family_name || '',
      data.access_token || '',
      !!data.access_token
    );
  }

  public static mapFromSignInSilentCallbackPayloadResult(data: SignInSilentCallbackPayloadResult): User | null {
    if (!data) return null;
    return new User(
      data.profile.nickname || '',
      data.profile.email || '',
      data.profile.name || '',
      data.profile.family_name || '',
      data.access_token || '',
      !!data.access_token
    );
  }
}

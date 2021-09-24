import { InjectableType } from 'app.core/enums';
import { User } from 'app.core/models';
import { IAuthenticationService } from 'app.core/interfaces/services';
import { IAuthenticationStore } from 'app.core/interfaces/stores';
import { injectable, inject } from 'inversify';
import { useActions } from './actions';
import { useGetters } from './getters';
import { useMutations } from './mutations';
import { useState } from './state';
import { AppStore } from 'app.store';
import { BaseStore } from 'app.store/_base/base-store';

@injectable()
export class AuthenticationStore extends BaseStore implements IAuthenticationStore {
  constructor(
    @inject(AppStore) appStore: AppStore,
    @inject(InjectableType.IAuthenticationService) authenticationService: IAuthenticationService
  ) {
    super(appStore, 'authentication-store');

    if (!this.store.hasModule(this.namespace)) {
      this.store.registerModule(this.namespace, {
        namespaced: true,
        actions: useActions(authenticationService),
        getters: useGetters(),
        mutations: useMutations(),
        state: useState(),
      });
    }
  }

  get user(): User {
    return (this.store.getters as { [key: string]: User })[`${this.namespace}/user`];
  }

  get isAuthenticating(): boolean {
    return (this.store.getters as { [key: string]: boolean })[`${this.namespace}/isAuthenticating`];
  }

  async login(returnPath: string): Promise<void> {
    return (await this.store.dispatch(`${this.namespace}/login`, returnPath)) as Promise<void>;
  }

  async logout(): Promise<void> {
    return (await this.store.dispatch(`${this.namespace}/logout`)) as Promise<void>;
  }

  async authenticate(returnPath: string): Promise<void> {
    return (await this.store.dispatch(`${this.namespace}/authenticate`, returnPath)) as Promise<void>;
  }

  async isUserLoggedIn(): Promise<boolean> {
    return (await this.store.dispatch(`${this.namespace}/isUserLoggedIn`)) as Promise<boolean>;
  }

  async signinRedirectCallback(returnPath: string): Promise<void> {
    return (await this.store.dispatch(`${this.namespace}/signinRedirectCallback`, returnPath)) as Promise<void>;
  }

  async signoutRedirectCallback(returnPath: string): Promise<void> {
    return (await this.store.dispatch(`${this.namespace}/signoutRedirectCallback`, returnPath)) as Promise<void>;
  }

  async signinSilentCallback(): Promise<void> {
    return (await this.store.dispatch(`${this.namespace}/signinSilentCallback`)) as Promise<void>;
  }

  async reset(): Promise<void> {
    return (await this.store.dispatch(`${this.namespace}/reset`)) as Promise<void>;
  }
}

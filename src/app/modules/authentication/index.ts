import Layout from './index.vue';
import loginRoute from './views/login';
import registerRoute from './views/register';
import oidcLoginRoute from './views/oidc-login';
import oidcLoginRedirectRoute from './views/oidc-login-redirect';
import oidcLogoutRedirectRoute from './views/oidc-logout-redirect';
import oidcLoginSilentRenewRoute from './views/oidc-login-silent-renew';
import { Module } from '~/core/types';
import { RouteRecordRaw } from 'vue-router';

export class AuthenticationModule implements Module {
  private _routeConfig: RouteRecordRaw;

  constructor() {
    this._routeConfig = {
      path: '/authentication',
      redirect: '/authentication/oidc-login',
      component: Layout,
      children: [
        loginRoute,
        registerRoute,
        oidcLoginRoute,
        oidcLoginRedirectRoute,
        oidcLogoutRedirectRoute,
        oidcLoginSilentRenewRoute,
      ],
      meta: {
        requireAuthentication: false,
        title: 'Authentication',
        noCache: true,
        layout: 'empty-layout',
      },
    };
  }

  public get route(): RouteRecordRaw {
    return this._routeConfig;
  }
}

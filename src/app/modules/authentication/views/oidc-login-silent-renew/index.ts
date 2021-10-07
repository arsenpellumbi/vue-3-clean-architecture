import { RouteRecordRaw } from 'vue-router';

const oidcLoginRedirectRoute: RouteRecordRaw = {
  path: 'oidc-login-silent-renew',
  name: 'OidcLoginSilentRenew',
  component: () => import('./oidc-login-silent-renew.vue'),
  meta: {
    requireAuthentication: false,
    title: 'Oidc login silent renew',
    noCache: true,
    layout: 'empty-layout',
  },
};

export default oidcLoginRedirectRoute;

import { RouteRecordRaw } from 'vue-router';

const oidcLogoutRedirectRoute: RouteRecordRaw = {
  path: 'oidc-logout-redirect',
  name: 'OidcLogoutRedirect',
  component: () => import('./oidc-logout-redirect.vue'),
  meta: {
    requireAuthentication: false,
    title: 'Oidc logout redirect',
    noCache: true,
    layout: 'empty-layout',
  },
};

export default oidcLogoutRedirectRoute;

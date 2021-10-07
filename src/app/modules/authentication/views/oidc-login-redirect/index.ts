import { RouteRecordRaw } from 'vue-router';

const oidcLoginRedirectRoute: RouteRecordRaw = {
  path: 'oidc-login-redirect',
  name: 'OidcLoginRedirect',
  component: () => import('./oidc-login-redirect.vue'),
  meta: {
    requireAuthentication: false,
    title: 'Oidc login redirect',
    noCache: true,
    layout: 'empty-layout',
  },
};

export default oidcLoginRedirectRoute;

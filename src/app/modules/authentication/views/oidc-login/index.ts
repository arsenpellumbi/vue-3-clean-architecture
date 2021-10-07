import { RouteRecordRaw } from 'vue-router';

const oidcLoginRoute: RouteRecordRaw = {
  path: 'oidc-login',
  name: 'OidcLogin',
  component: () => import('./oidc-login.vue'),
  meta: {
    requireAuthentication: false,
    title: 'OidcLogin',
    noCache: true,
    layout: 'empty-layout',
  },
};

export default oidcLoginRoute;

import { RouteRecordRaw } from 'vue-router';

const loginRoute: RouteRecordRaw = {
  path: 'login',
  name: 'Login',
  component: () => import('./login.vue'),
  meta: {
    requireAuthentication: false,
    title: 'Login',
    noCache: true,
    layout: 'empty-layout',
  },
};

export default loginRoute;

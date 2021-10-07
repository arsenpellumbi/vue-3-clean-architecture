import { RouteRecordRaw } from 'vue-router';

const registerRoute: RouteRecordRaw = {
  path: 'register',
  name: 'Register',
  component: () => import('./register.vue'),
  meta: {
    requireAuthentication: false,
    title: 'Register',
    noCache: true,
    layout: 'empty-layout',
  },
};

export default registerRoute;

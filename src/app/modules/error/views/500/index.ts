import { RouteRecordRaw } from 'vue-router';

const error500Route: RouteRecordRaw = {
  path: '500',
  name: '500',
  component: () => import('./500.vue'),
  meta: {
    requireAuthentication: false,
    title: '500',
    noCache: true,
    layout: 'empty-layout',
  },
};

export default error500Route;

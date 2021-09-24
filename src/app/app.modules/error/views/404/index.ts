import { RouteRecordRaw } from 'vue-router';

const error404Route: RouteRecordRaw = {
  path: '404',
  name: '404',
  component: () => import('./404.vue'),
  meta: {
    requireAuthentication: false,
    title: '404',
    noCache: true,
    layout: 'empty-layout',
  },
};

export default error404Route;

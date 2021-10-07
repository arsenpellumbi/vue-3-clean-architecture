import { RouteRecordRaw } from 'vue-router';

const projectListRoute: RouteRecordRaw = {
  path: 'projects',
  name: 'ProjectList',
  component: () => import('./project-list.vue'),
  meta: {
    requireAuthentication: true,
    title: 'Project list',
    noCache: true,
    layout: 'main-layout',
  },
};

export default projectListRoute;

import { RouteRecordRaw } from 'vue-router';

const projectItemRoute: RouteRecordRaw = {
  path: 'projects/:projectId',
  name: 'ProjectItem',
  component: () => import('./project-item.vue'),
  meta: {
    requireAuthentication: true,
    title: 'Project item',
    noCache: true,
    layout: 'main-layout',
  },
};

export default projectItemRoute;

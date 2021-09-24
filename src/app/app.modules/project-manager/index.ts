import Layout from './index.vue';
import projectListRoute from './views/project-list';
import projectItemRoute from './views/project-item';
import { Module } from 'app.core/types';
import { RouteRecordRaw } from 'vue-router';

export class ProjectManagerModule implements Module {
  private _routeConfig: RouteRecordRaw;

  constructor() {
    this._routeConfig = {
      path: '/project-manager',
      redirect: '/project-manager/projects',
      component: Layout,
      children: [projectListRoute, projectItemRoute],
      meta: {
        requireAuthentication: true,
        title: 'Project manager',
        noCache: true,
        layout: 'main-layout',
      },
    };
  }

  public get routeConfig(): RouteRecordRaw {
    return this._routeConfig;
  }
}

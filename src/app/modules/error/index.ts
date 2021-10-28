import Layout from './index.vue';
import error404Route from './views/404';
import error500Route from './views/500';
import { Module } from '~/core/types';
import { RouteRecordRaw } from 'vue-router';

export class ErrorModule implements Module {
  private _routeConfig: RouteRecordRaw;

  constructor() {
    this._routeConfig = {
      path: '/error',
      redirect: '/error/404',
      component: Layout,
      children: [error404Route, error500Route],
      meta: {
        requireAuthentication: false,
        title: 'Error',
        noCache: true,
        layout: 'empty-layout',
      },
    };
  }

  public get route(): RouteRecordRaw {
    return this._routeConfig;
  }
}

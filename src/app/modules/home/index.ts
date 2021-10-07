import { Module } from 'app.core/types';
import { RouteRecordRaw } from 'vue-router';
import Layout from './index.vue';

export class HomeModule implements Module {
  private _routeConfig: RouteRecordRaw;

  constructor() {
    this._routeConfig = {
      path: '/home',
      name: 'Home',
      component: Layout,
      meta: {
        requireAuthentication: true,
        title: 'Home',
        noCache: true,
        layout: 'main-layout',
      },
    };
  }

  public get routeConfig(): RouteRecordRaw {
    return this._routeConfig;
  }
}

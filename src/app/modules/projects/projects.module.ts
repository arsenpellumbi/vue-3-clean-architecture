import { Module } from '~/core/types';
import { RouteRecordRaw } from 'vue-router';
import route from './projects.routing';

export class ProjectsModule implements Module {
  private _route: RouteRecordRaw;

  constructor() {
    this._route = route;
  }

  public get route(): RouteRecordRaw {
    return this._route;
  }
}

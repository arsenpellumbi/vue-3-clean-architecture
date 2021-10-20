import { interfaces } from 'inversify';
import { RouteRecordRaw } from 'vue-router';

export const MODULE: interfaces.ServiceIdentifier<Module> = 'APP_MODULE';

export interface Module {
  routeConfig: RouteRecordRaw;
}

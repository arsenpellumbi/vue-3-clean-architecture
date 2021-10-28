import { interfaces } from 'inversify';
import { provide } from '~/inversify.config';
import { Module } from '~/core/types';
import { HomeModule } from './home';
import { AuthenticationModule } from './authentication';
import { ErrorModule } from './error';
import { ProjectsModule } from './projects/projects.module';

export const APP_MODULES: interfaces.ServiceIdentifier<AppModules> = 'APP_MODULES';

@provide<AppModules>(APP_MODULES, true)
export class AppModules {
  private _modules: Module[];

  get routes() {
    return this._modules.map((module) => module.route).filter((routeConfig) => !!routeConfig);
  }

  constructor() {
    this._modules = [new ErrorModule(), new AuthenticationModule(), new HomeModule(), new ProjectsModule()];
  }
}

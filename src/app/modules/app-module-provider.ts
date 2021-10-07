import { injectable } from 'inversify';
import { Module } from 'app.core/types';
import { HomeModule } from './home';
import { ProjectManagerModule } from './project-manager';
import { AuthenticationModule } from './authentication';
import { ErrorModule } from './error';

@injectable()
export class ModuleProvider {
  private _modules: Module[];

  get routes() {
    return this._modules.map((module) => module.routeConfig).filter((routeConfig) => !!routeConfig);
  }

  constructor() {
    this._modules = [new ErrorModule(), new AuthenticationModule(), new HomeModule(), new ProjectManagerModule()];
  }
}

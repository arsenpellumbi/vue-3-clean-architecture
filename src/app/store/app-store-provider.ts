import { InjectableType } from '~/core/enums';
import { IAuthenticationStore, IProjectStore, ITaskStore } from '~/core/interfaces/stores';
import { injectable, ContainerModule, interfaces } from 'inversify';
import { AuthenticationStore } from './authentication-store';
import { ProjectStore } from './project-store';
import { TaskStore } from './task-store';

export * from './app-store';

@injectable()
export class AppStoreProvider {
  private _storeModules: ContainerModule;

  public get storeModules(): ContainerModule {
    return this._storeModules;
  }

  constructor() {
    this._storeModules = new ContainerModule((bind: interfaces.Bind) => {
      bind<IAuthenticationStore>(InjectableType.IAuthenticationStore).to(AuthenticationStore);
      bind<IProjectStore>(InjectableType.IProjectStore).to(ProjectStore);
      bind<ITaskStore>(InjectableType.ITaskStore).to(TaskStore);
    });
  }
}

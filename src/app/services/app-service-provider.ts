import { InjectableType } from 'app.core/enums';
import {
  IIndexDbService,
  IToastService,
  IAuthenticationService,
  IProjectService,
  ITaskService,
} from 'app.core/interfaces/services';
import { injectable, ContainerModule, interfaces } from 'inversify';
import { AuthenticationService } from './services/authentication-service';
import { IndexDbService } from './services/index-db-service';
import { ProjectService } from './services/project-service';
import { TaskService } from './services/task-service';
import { ToastService } from './services/toast-service';

@injectable()
export class AppServiceProvider {
  private _serviceModules: ContainerModule;

  public get serviceModules(): ContainerModule {
    return this._serviceModules;
  }

  constructor() {
    this._serviceModules = new ContainerModule((bind: interfaces.Bind) => {
      bind<IIndexDbService>(InjectableType.IIndexDbService).to(IndexDbService);
      bind<IToastService>(InjectableType.IToastService).to(ToastService);
      bind<IAuthenticationService>(InjectableType.IAuthenticationService).to(AuthenticationService);
      bind<IProjectService>(InjectableType.IProjectService).to(ProjectService);
      bind<ITaskService>(InjectableType.ITaskService).to(TaskService);
    });
  }
}

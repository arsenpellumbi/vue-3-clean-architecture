import navigationGuard from './navigation-guards';
import { inject, injectable } from 'inversify';
import { InjectableType } from '~/core/enums';
import { IAuthenticationStore } from '~/core/interfaces/stores';
import { ModuleProvider } from '~/modules';
import { Configurations } from '~/core/configurations';
import { Router, createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

@injectable()
export class AppRouter {
  private _router: Router;

  public get router() {
    return this._router;
  }

  constructor(
    @inject(Configurations) configurations: Configurations,
    @inject(ModuleProvider) moduleProvider: ModuleProvider,
    @inject(InjectableType.IAuthenticationStore) authenticationStore: IAuthenticationStore
  ) {
    this._router = createRouter({
      scrollBehavior: () => ({ left: 0, top: 0 }),
      routes: moduleProvider.routes,
      history: createWebHistory(process.env.VUE_ROUTER_BASE),
    });

    this._router.addRoute({ path: '/', redirect: configurations.initialRoutePath });
    this._router.addRoute({ path: '/:pathMatch(.*)*', redirect: 'error/404' });

    this._router.beforeEach(
      async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) =>
        await navigationGuard.beforeEach(authenticationStore, to, from, next)
    );
  }
}

import navigationGuard from './navigation-guards';
import { inject, interfaces } from 'inversify';
import { provide } from '~/inversify.config';
import { AppModules, APP_MODULES } from '~/modules/app-modules';
import { CONFIGURATIONS, Configurations } from '~/core/configurations';
import { Router, createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { AuthenticationStore, AUTHENTICATION_STORE } from '~/store/authentication-store';

export const APP_ROUTER: interfaces.ServiceIdentifier<AppRouter> = 'APP_ROUTER';

@provide<AppRouter>(APP_ROUTER, true)
export class AppRouter {
  private _router: Router;

  public get router() {
    return this._router;
  }

  constructor(
    @inject(CONFIGURATIONS) configurations: Configurations,
    @inject(APP_MODULES) moduleProvider: AppModules,
    @inject(AUTHENTICATION_STORE) authenticationStore: AuthenticationStore
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

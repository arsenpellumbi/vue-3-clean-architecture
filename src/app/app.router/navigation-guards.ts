import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { IAuthenticationStore } from 'app.core/interfaces/stores';

export default {
  beforeEach: async (
    authenticationStore: IAuthenticationStore,
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> => {
    if (!to.meta.requireAuthentication) {
      return next();
    }

    const isAuthenticated = await authenticationStore.isUserLoggedIn();
    if (isAuthenticated) return next();

    return next({ path: '/authentication' });
  },
};

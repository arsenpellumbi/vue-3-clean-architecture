import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { AuthenticationStore } from '~/store/authentication-store';

export default {
  beforeEach: async (
    authenticationStore: AuthenticationStore,
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> => {
   // if (!to.meta.requireAuthentication) {
      return next();
    //}

    const isAuthenticated = await authenticationStore.isUserLoggedIn();
    if (isAuthenticated) return next();

    return next({ path: '/authentication' });
  },
};

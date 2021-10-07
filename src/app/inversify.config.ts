import { Container } from 'inversify';
import { Configurations } from './core/configurations';
import { ModuleProvider } from './modules';
import { AppRouter } from './router';
import { ApiInterceptor, AppServiceProvider } from './services';
import { AppStore, AppStoreProvider } from '~/store';

const container = new Container();

//Register configurations
container.bind<Configurations>(Configurations).toSelf().inSingletonScope();

//Register ApiInterceptor
container.bind<ApiInterceptor>(ApiInterceptor).toSelf();

//Register authentication-service
container.bind<AppServiceProvider>(AppServiceProvider).toSelf();

//Register modules ContainerModules. Each module has its own injections
container.load(container.get<AppServiceProvider>(AppServiceProvider).serviceModules);

//Initialize the store and register
container.bind<AppStore>(AppStore).toSelf().inSingletonScope();

//Initialize the store and register
container.bind<AppStoreProvider>(AppStoreProvider).toSelf();

//Register modules ContainerModules. Each module has its own injections
container.load(container.get<AppStoreProvider>(AppStoreProvider).storeModules);

//Register ModuleProvider
container.bind<ModuleProvider>(ModuleProvider).toSelf().inSingletonScope();

//Initialize the router and register
container.bind<AppRouter>(AppRouter).toSelf().inSingletonScope();

export { container };

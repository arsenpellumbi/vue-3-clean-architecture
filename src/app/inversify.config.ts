import { Container } from 'inversify';
import { Configurations } from './app.core/configurations';
import { ModuleProvider } from './app.modules';
import { AppRouter } from './app.router';
import { ApiInterceptor, AppServiceProvider } from './app.services';
import { AppStore, AppStoreProvider } from 'app.store';

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

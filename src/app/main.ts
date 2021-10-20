import 'reflect-metadata';
import { createApp } from 'vue';

import { container } from './inversify.config';
import App from './app.vue';
import { AppRouter, APP_ROUTER } from './router/app-router';
import { AppStore, APP_STORE } from './store/app-store';

console.info('Running SPA.');
const publicPath = '/';

function start() {
  const appStore = container.get<AppStore>(APP_STORE);
  const appRouter = container.get<AppRouter>(APP_ROUTER);

  const app = createApp(App).use(appStore.store).use(appRouter.router);

  const urlPath = window.location.href.replace(window.location.origin, '');
  console.info('Booting plugins.');
  const requirePlugin = require.context('./shell/plugins', false, /[\w-]+\.ts$/);
  const pluginFiles = requirePlugin.keys();
  for (let i = 0; i < pluginFiles.length; i++) {
    const plugin = requirePlugin(pluginFiles[i]);
    if (typeof plugin.default !== 'function') {
      continue;
    }
    try {
      plugin.default({ app, router: appRouter.router, store: appStore.store, urlPath, publicPath });
    } catch (err) {
      console.error('boot error:', err);
      return;
    }
  }

  app.mount('#app');
}

start();

import { createI18n } from 'vue-i18n';
import { PluginParams } from 'app.core/types';
import messages from 'app.locales';

const i18n = createI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: messages,
});

export default function <TStore>({ app }: PluginParams<TStore>) {
  // Set i18n instance on app
  app.use(i18n);
}

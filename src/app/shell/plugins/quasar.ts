import '../css/app.scss';
import iconSet from 'quasar/icon-set/mdi-v4.js';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/mdi-v4/mdi-v4.css';
import { Quasar, Notify, LoadingBar } from 'quasar';
import { PluginParams } from 'app.core/types';

export default function <TStore>({ app }: PluginParams<TStore>) {
  app.use(Quasar, {
    config: {
      animations: 'all',
      notify: {
        /* look at QUASARCONFOPTIONS from the API card (bottom of page) */
        position: 'bottom',
        progress: true,
        actions: [
          {
            icon: 'mdi-close',
            color: 'white',
            flat: true,
            round: true,
            handler: () => {
              /* ... */
            },
          },
        ],
      },
    },
    plugins: {
      Notify,
      LoadingBar,
    },
    iconSet: iconSet,
  });
}

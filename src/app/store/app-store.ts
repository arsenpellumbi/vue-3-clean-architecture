import { injectable, inject } from 'inversify';
import { Configurations } from '~/core/configurations';
import { AppStoreState } from '~/core/interfaces/stores';
import { createStore, Store } from 'vuex';

@injectable()
export class AppStore {
  private _store: Store<AppStoreState>;

  public get store() {
    return this._store;
  }

  constructor(@inject(Configurations) configurations: Configurations) {
    this._store = createStore<AppStoreState>({
      state: {
        version: 1,
      },

      strict: !!configurations.debug,
    });
  }
}

import { injectable, unmanaged } from 'inversify';
import { AppStoreState, IBaseStore } from 'app.core/interfaces/stores';
import { Store } from 'vuex';
import { AppStore } from 'app.store';

@injectable()
export class BaseStore implements IBaseStore {
  private _namespace: string;
  private _store: Store<AppStoreState>;

  get namespace(): string {
    return this._namespace;
  }

  get store(): Store<AppStoreState> {
    return this._store;
  }

  constructor(appStore: AppStore, @unmanaged() namespace: string) {
    this._store = appStore.store;
    this._namespace = namespace;
  }
}

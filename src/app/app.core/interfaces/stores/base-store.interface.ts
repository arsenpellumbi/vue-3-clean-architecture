import { Store } from 'vuex';

export interface AppStoreState {
  version: number;
}

export interface IBaseStore {
  namespace: string;
  store: Store<AppStoreState>;
}

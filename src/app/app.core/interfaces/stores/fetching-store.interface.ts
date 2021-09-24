import { IBaseStore } from '.';

export interface FetchingStoreState {
  fetching: boolean;
}

export interface IFetchingStore extends IBaseStore {
  readonly fetching: boolean;
}

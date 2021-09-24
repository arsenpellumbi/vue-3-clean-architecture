import { IFetchingStore } from 'app.core/interfaces/stores';
import { injectable } from 'inversify';
import { BaseStore } from '../base-store';

@injectable()
export class FetchingStore extends BaseStore implements IFetchingStore {
  get fetching(): boolean {
    return (this.store.getters as { [key: string]: boolean })[`${this.namespace}/fetching`];
  }
}

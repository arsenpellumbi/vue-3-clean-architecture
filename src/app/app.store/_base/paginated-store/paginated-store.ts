import { injectable } from 'inversify';
import { FetchingStore } from '../fetching-store';
import { IPaginatedStore } from 'app.core/interfaces/stores';
import { Pagination } from 'app.core/types';

@injectable()
export class PaginatedStore extends FetchingStore implements IPaginatedStore {
  get currentPagination(): Pagination {
    return (this.store.getters as { [key: string]: Pagination })[`${this.namespace}/currentPagination`];
  }
}

import { TaskStoreState } from 'app.core/interfaces/stores';
import { useState as usePaginatedStoreState } from 'app.store/_base/paginated-store/state';

export const useState = (): TaskStoreState => ({
  ...usePaginatedStoreState(),
  tasks: [],
});

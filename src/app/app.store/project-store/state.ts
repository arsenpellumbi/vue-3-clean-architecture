import { ProjectStoreState } from 'app.core/interfaces/stores';
import { useState as usePaginatedState } from 'app.store/_base/paginated-store/state';

export const useState = (): ProjectStoreState => ({
  ...usePaginatedState(),
  projects: [],
});

import { FetchingStoreState } from 'app.core/interfaces/stores';

export const useState = (): FetchingStoreState => ({
  fetching: false,
});

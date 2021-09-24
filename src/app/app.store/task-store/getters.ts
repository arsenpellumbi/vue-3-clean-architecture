import { GetterTree } from 'vuex';
import { Task } from 'app.core/models';
import { AppStoreState, TaskStoreState } from 'app.core/interfaces/stores';
import { useGetters as usePaginatedGetters } from 'app.store/_base/paginated-store/getters';

export const useGetters = (): GetterTree<TaskStoreState, AppStoreState> => ({
  ...usePaginatedGetters(),
  currentTasks(state: TaskStoreState): Task[] {
    return state.tasks;
  },
});

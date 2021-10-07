import { GetterTree } from 'vuex';
import { TaskList } from 'app.core/models';
import { AppStoreState, TaskStoreState } from 'app.core/interfaces/stores';

export const useGetters = (): GetterTree<TaskStoreState, AppStoreState> => ({
  taskList(state: TaskStoreState): TaskList {
    return state.taskList;
  },
});

import { GetterTree } from 'vuex';
import { TaskList } from '~/core/models';
import { AppStoreState, TaskStoreState } from '~/core/interfaces/stores';

export const useGetters = (): GetterTree<TaskStoreState, AppStoreState> => ({
  taskList(state: TaskStoreState): TaskList {
    return state.taskList;
  },
});

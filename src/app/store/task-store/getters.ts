import { GetterTree } from 'vuex';
import { TaskList } from '~/core/models';
import { AppStoreState } from '../app-store';
import { TaskStoreState } from './state';

export const useGetters = (): GetterTree<TaskStoreState, AppStoreState> => ({
  taskList(state: TaskStoreState): TaskList {
    return state.taskList;
  },
});

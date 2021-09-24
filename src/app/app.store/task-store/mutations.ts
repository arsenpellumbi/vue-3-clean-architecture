import { MutationTree } from 'vuex';
import { Task } from 'app.core/models';
import { TaskStoreState } from 'app.core/interfaces/stores';
import { useMutations as usePaginatedMutations } from 'app.store/_base/paginated-store/mutations';

export const useMutations = (): MutationTree<TaskStoreState> => ({
  ...usePaginatedMutations(),

  setTasks(state: TaskStoreState, tasks: Task[]): void {
    state.tasks = tasks;
  },

  addTask(state: TaskStoreState, task: Task): void {
    state.tasks.unshift(task);
  },

  updateTask(state: TaskStoreState, task: Task): void {
    const index = state.tasks.indexOf(state.tasks.filter((_task: Task) => _task.id === task.id)[0]);
    state.tasks = Object.assign([], state.tasks, { [index]: task });
  },

  deleteTask(state: TaskStoreState, id: Guid): void {
    state.tasks = state.tasks.filter((_task: Task) => _task.id !== id);
  },
});

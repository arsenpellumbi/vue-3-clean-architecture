import { TaskList } from '~/core/models';

export interface TaskStoreState {
  readonly taskList: TaskList;
}

export const useState = (): TaskStoreState => ({
  taskList: new TaskList(),
});

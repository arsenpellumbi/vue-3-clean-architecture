import { TaskStoreState } from '~/core/interfaces/stores';
import { TaskList } from '~/core/models';

export const useState = (): TaskStoreState => ({
  taskList: new TaskList(),
});

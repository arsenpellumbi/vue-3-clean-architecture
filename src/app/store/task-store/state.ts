import { TaskStoreState } from 'app.core/interfaces/stores';
import { TaskList } from 'app.core/models';

export const useState = (): TaskStoreState => ({
  taskList: new TaskList(),
});

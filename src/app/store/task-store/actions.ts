import { TaskList, Task } from '~/core/models';
import {
  GetTasksByProjectIdPayload,
  SearchTasksInProjectPayload,
  GetTaskByIdPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
  DeleteTaskPayload,
} from '~/core/interfaces/payloads';
import { ITaskService } from '~/core/interfaces/services';
import { TaskStoreState, AppStoreState } from '~/core/interfaces/stores';
import { ActionTree, ActionContext } from 'vuex';

export const useActions = (taskService: ITaskService): ActionTree<TaskStoreState, AppStoreState> => ({
  async fetchTasks(
    context: ActionContext<TaskStoreState, AppStoreState>,
    payload: GetTasksByProjectIdPayload
  ): Promise<void> {
    const result = await taskService.getTasks(payload);
    context.commit('setTasks', result);
  },

  async searchTasks(
    context: ActionContext<TaskStoreState, AppStoreState>,
    payload: SearchTasksInProjectPayload
  ): Promise<void> {
    const result = await taskService.searchTasks(payload);
    context.commit('setTasks', result);
  },

  async getTaskById(context: ActionContext<TaskStoreState, AppStoreState>, payload: GetTaskByIdPayload): Promise<Task> {
    const task = context.state.taskList.rows.filter((task: Task) => task.id == payload.id)[0];
    if (task) {
      return task;
    }

    return await taskService.getTask(payload);
  },

  async createTask(context: ActionContext<TaskStoreState, AppStoreState>, payload: CreateTaskPayload): Promise<void> {
    const id = await taskService.createTask(payload);

    context.commit(
      'addTask',
      new Task(id, new Date(), payload.title, payload.description, payload.projectId, payload.type)
    );
  },

  async updateTask(context: ActionContext<TaskStoreState, AppStoreState>, payload: UpdateTaskPayload): Promise<void> {
    await taskService.updateTask(payload);

    const task = context.state.taskList.rows.find((task: Task) => task.id == payload.id);

    if (task)
      context.commit(
        'updateTask',
        new Task(task.id, new Date(), payload.title, payload.description, task.projectId, payload.type)
      );
  },

  async deleteTask(context: ActionContext<TaskStoreState, AppStoreState>, payload: DeleteTaskPayload): Promise<void> {
    await taskService.deleteTask(payload);
    context.commit('deleteTask', payload.id);
    if (context.state.taskList.rows.length === 0) {
      context.dispatch('fetchTasks', {
        pageIndex: context.state.taskList.pagination.pageIndex,
        pageSize: context.state.taskList.pagination.pageSize,
      });
    }
  },

  reset(context: ActionContext<TaskStoreState, AppStoreState>): void {
    context.commit('setTasks', new TaskList());
  },
});

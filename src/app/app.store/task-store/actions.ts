import { Task } from 'app.core/models';
import {
  GetTasksByProjectIdPayload,
  SearchTasksInProjectPayload,
  GetTaskByIdPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
  DeleteTaskPayload,
} from 'app.core/interfaces/payloads';
import { ITaskService } from 'app.core/interfaces/services';
import { TaskStoreState, AppStoreState } from 'app.core/interfaces/stores';
import { ActionTree, ActionContext } from 'vuex';

export const useActions = (taskService: ITaskService): ActionTree<TaskStoreState, AppStoreState> => ({
  async fetchTasks(
    context: ActionContext<TaskStoreState, AppStoreState>,
    payload: GetTasksByProjectIdPayload
  ): Promise<void> {
    context.commit('setFetching', true);
    const result = await taskService.getTasks(payload);
    context.commit('setTasks', Task.mapFromGetTasksByProjectIdPayloadResult(result.data));
    context.commit('setPagination', {
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalCount: result.count,
      totalPages: result.totalPages,
    });
    context.commit('setFetching', false);
  },

  async searchTasks(
    context: ActionContext<TaskStoreState, AppStoreState>,
    payload: SearchTasksInProjectPayload
  ): Promise<void> {
    context.commit('setFetching', true);
    const result = await taskService.searchTasks(payload);
    context.commit('setTasks', Task.mapFromSearchTasksInProjectPayloadResult(result.data));
    context.commit('setPagination', {
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalCount: result.count,
      totalPages: result.totalPages,
    });
    context.commit('setFetching', false);
  },

  async getTaskById(context: ActionContext<TaskStoreState, AppStoreState>, payload: GetTaskByIdPayload): Promise<Task> {
    const task = context.state.tasks.filter((task: Task) => task.id == payload.id)[0];
    if (task) {
      return task;
    }
    const data = await taskService.getTask(payload);
    return Task.mapFromGetTaskByIdPayloadResult(data);
  },

  async createTask(context: ActionContext<TaskStoreState, AppStoreState>, payload: CreateTaskPayload): Promise<void> {
    const id = await taskService.createTask(payload);

    context.commit(
      'addTask',
      new Task(id, new Date(), payload.title, payload.description, payload.projectId, payload.type)
    );

    context.commit('addPaginationItems', 1);
  },

  async updateTask(context: ActionContext<TaskStoreState, AppStoreState>, payload: UpdateTaskPayload): Promise<void> {
    await taskService.updateTask(payload);

    const task = context.state.tasks.filter((task: Task) => task.id == payload.id)[0];

    if (task)
      context.commit(
        'updateTask',
        new Task(task.id, new Date(), payload.title, payload.description, task.projectId, payload.type)
      );
  },

  async deleteTask(context: ActionContext<TaskStoreState, AppStoreState>, payload: DeleteTaskPayload): Promise<void> {
    await taskService.deleteTask(payload);
    context.commit('deleteTask', payload.id);
    context.commit('removePaginationItems', 1);
  },

  reset(context: ActionContext<TaskStoreState, AppStoreState>): void {
    context.commit('setTasks', []);
  },
});

import { useState } from './state';
import { useActions } from './actions';
import { useGetters } from './getters';
import { useMutations } from './mutations';

import { injectable, inject } from 'inversify';
import { InjectableType } from 'app.core/enums';
import { Task, TaskList } from 'app.core/models';
import {
  GetTasksByProjectIdPayload,
  SearchTasksInProjectPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
  DeleteTaskPayload,
  GetTaskByIdPayload,
} from 'app.core/interfaces/payloads';
import { ITaskService } from 'app.core/interfaces/services';
import { ITaskStore } from 'app.core/interfaces/stores';
import { AppStore } from 'app.store';
import { BaseStore } from 'app.store/base-store';

@injectable()
export class TaskStore extends BaseStore implements ITaskStore {
  constructor(@inject(AppStore) store: AppStore, @inject(InjectableType.ITaskService) taskService: ITaskService) {
    super(store, 'project-manager/task-store');

    if (!this.store.hasModule(this.namespace)) {
      this.store.registerModule(this.namespace, {
        namespaced: true,
        actions: useActions(taskService),
        getters: useGetters(),
        mutations: useMutations(),
        state: useState(),
      });
    }
  }

  get taskList(): TaskList {
    return (this.store.getters as { [key: string]: TaskList })[`${this.namespace}/taskList`];
  }

  async fetchTasks(payload: GetTasksByProjectIdPayload): Promise<void> {
    await this.store.dispatch(`${this.namespace}/fetchTasks`, payload);
  }

  async searchTasks(payload: SearchTasksInProjectPayload): Promise<void> {
    await this.store.dispatch(`${this.namespace}/searchTasks`, payload);
  }

  async createTask(payload: CreateTaskPayload): Promise<void> {
    await this.store.dispatch(`${this.namespace}/createTask`, payload);
  }

  async updateTask(payload: UpdateTaskPayload): Promise<void> {
    await this.store.dispatch(`${this.namespace}/updateTask`, payload);
  }

  async deleteTask(payload: DeleteTaskPayload): Promise<void> {
    await this.store.dispatch(`${this.namespace}/deleteTask`, payload);
  }

  async getTaskById(payload: GetTaskByIdPayload): Promise<Task> {
    return (await this.store.dispatch(`${this.namespace}/getTaskById`, payload)) as Promise<Task>;
  }

  async reset(): Promise<void> {
    await this.store.dispatch(`${this.namespace}/reset`);
  }
}
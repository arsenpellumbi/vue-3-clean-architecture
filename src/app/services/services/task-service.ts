import { Configurations } from '~/core/configurations';
import { RequestMethod, TaskType } from '~/core/enums';
import {
  GetTasksByProjectIdPayload,
  SearchTasksInProjectPayload,
  GetTaskByIdPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
  DeleteTaskPayload,
} from '~/core/interfaces/payloads';
import { ITaskService } from '~/core/interfaces/services';
import { Task, TaskList } from '~/core/models';
import { ApiService } from '~/services/api/api-service';
import { AxiosResponse } from 'axios';
import { injectable, inject } from 'inversify';

interface GetTaskByIdPayloadResult {
  readonly id: Guid;
  readonly createdDate: Date;
  readonly modifiedDate: Date;
  readonly title: string;
  readonly description: string;
  readonly projectId: Guid;
  readonly type: TaskType;
}

interface GetTasksByProjectIdPayloadResult {
  readonly totalPages: number;
  readonly count: number;
  readonly data: {
    readonly id: Guid;
    readonly createdDate: Date;
    readonly modifiedDate: Date;
    readonly title: string;
    readonly description: string;
    readonly projectId: Guid;
    readonly type: TaskType;
  }[];
}

interface SearchTasksInProjectPayloadResult {
  readonly totalPages: number;
  readonly count: number;
  readonly data: {
    readonly id: Guid;
    readonly createdDate: Date;
    readonly modifiedDate: Date;
    readonly title: string;
    readonly description: string;
    readonly projectId: Guid;
    readonly type: TaskType;
  }[];
}

@injectable()
export class TaskService extends ApiService implements ITaskService {
  constructor(@inject(Configurations) configurations: Configurations) {
    super(configurations.endpoints.projectManagerApi.baseUrl);
  }

  public async getTasks(payload: GetTasksByProjectIdPayload): Promise<TaskList> {
    return await this.request({
      method: RequestMethod.Get,
      url: '/projects/tasks',
      params: payload,
      loading: true,
    }).then(
      (response: AxiosResponse<GetTasksByProjectIdPayloadResult>) =>
        new TaskList(
          payload.pageIndex,
          payload.pageSize,
          response.data.totalPages,
          response.data.count,
          response.data.data.map(
            (item) =>
              new Task(
                item.id,
                item.modifiedDate || item.createdDate,
                item.title,
                item.description,
                item.projectId,
                item.type
              )
          )
        )
    );
  }

  public async searchTasks(payload: SearchTasksInProjectPayload): Promise<TaskList> {
    return await this.request({
      method: RequestMethod.Get,
      url: '/projects/tasks/search',
      params: payload,
    }).then(
      (response: AxiosResponse<SearchTasksInProjectPayloadResult>) =>
        new TaskList(
          payload.pageIndex,
          payload.pageSize,
          response.data.totalPages,
          response.data.count,
          response.data.data.map(
            (item) =>
              new Task(
                item.id,
                item.modifiedDate || item.createdDate,
                item.title,
                item.description,
                item.projectId,
                item.type
              )
          )
        )
    );
  }

  public async getTask(payload: GetTaskByIdPayload): Promise<Task> {
    const id = payload.id ? payload.id.toString() : '';
    return await this.request({
      method: RequestMethod.Get,
      url: `/projects/tasks/${id}`,
      loading: true,
    }).then(
      (response: AxiosResponse<GetTaskByIdPayloadResult>) =>
        new Task(
          response.data.id,
          response.data.modifiedDate || response.data.createdDate,
          response.data.title,
          response.data.description,
          response.data.projectId,
          response.data.type
        )
    );
  }

  public async createTask(payload: CreateTaskPayload): Promise<Guid> {
    return await this.request({
      method: RequestMethod.Post,
      url: '/projects/tasks',
      data: payload,
      loading: false,
    }).then((response: AxiosResponse<Guid>) => response.data);
  }

  public async updateTask(payload: UpdateTaskPayload): Promise<void> {
    return await this.request({
      method: RequestMethod.Put,
      url: '/projects/tasks',
      data: payload,
      loading: false,
    }).then((response: AxiosResponse<void>) => response.data);
  }

  public async deleteTask(payload: DeleteTaskPayload): Promise<void> {
    const id = payload.id ? payload.id.toString() : '';
    return await this.request({
      method: RequestMethod.Delete,
      url: `/projects/tasks/${id}`,
      loading: false,
    }).then((response: AxiosResponse<void>) => response.data);
  }
}

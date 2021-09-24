import { Configurations } from 'app.core/configurations';
import { RequestMethod } from 'app.core/enums';
import {
  GetTasksByProjectIdPayload,
  SearchTasksInProjectPayload,
  GetTaskByIdPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
  DeleteTaskPayload,
} from 'app.core/interfaces/payloads';
import {
  GetTasksByProjectIdPayloadResult,
  SearchTasksInProjectPayloadResult,
  GetTaskByIdPayloadResult,
} from 'app.core/interfaces/payloads-result';
import { ITaskService } from 'app.core/interfaces/services';
import { ApiService } from 'app.services/api/api-service';
import { AxiosResponse } from 'axios';
import { injectable, inject } from 'inversify';

@injectable()
export class TaskService extends ApiService implements ITaskService {
  constructor(@inject(Configurations) configurations: Configurations) {
    super(configurations.endpoints.projectManagerApi.baseUrl);
  }

  public async getTasks(payload: GetTasksByProjectIdPayload): Promise<GetTasksByProjectIdPayloadResult> {
    return await this.request({
      method: RequestMethod.Get,
      url: '/projects/tasks',
      params: payload,
      loading: true,
    }).then((response: AxiosResponse<GetTasksByProjectIdPayloadResult>) => response.data);
  }

  public async searchTasks(payload: SearchTasksInProjectPayload): Promise<SearchTasksInProjectPayloadResult> {
    return await this.request({
      method: RequestMethod.Get,
      url: '/projects/tasks/search',
      params: payload,
    }).then((response: AxiosResponse<SearchTasksInProjectPayloadResult>) => response.data);
  }

  public async getTask(payload: GetTaskByIdPayload): Promise<GetTaskByIdPayloadResult> {
    const id = payload.id ? payload.id.toString() : '';
    return await this.request({
      method: RequestMethod.Get,
      url: `/projects/tasks/${id}`,
      loading: true,
    }).then((response: AxiosResponse<GetTaskByIdPayloadResult>) => response.data);
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

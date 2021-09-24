import { Configurations } from 'app.core/configurations';
import { RequestMethod } from 'app.core/enums';
import {
  GetProjectsPayload,
  SearchProjectsPayload,
  GetProjectByIdPayload,
  CreateProjectPayload,
  UpdateProjectPayload,
  DeleteProjectPayload,
} from 'app.core/interfaces/payloads';
import {
  GetProjectsPayloadResult,
  SearchProjectsPayloadResult,
  GetProjectByIdPayloadResult,
} from 'app.core/interfaces/payloads-result';
import { IProjectService } from 'app.core/interfaces/services';
import { ApiService } from 'app.services/api/api-service';
import { AxiosResponse } from 'axios';
import { injectable, inject } from 'inversify';

@injectable()
export class ProjectService extends ApiService implements IProjectService {
  constructor(@inject(Configurations) configurations: Configurations) {
    super(configurations.endpoints.projectManagerApi.baseUrl);
  }

  public async getProjects(payload: GetProjectsPayload): Promise<GetProjectsPayloadResult> {
    return await this.request({
      method: RequestMethod.Get,
      url: '/projects',
      params: payload,
      loading: true,
    }).then((response: AxiosResponse<GetProjectsPayloadResult>) => response.data);
  }

  public async searchProjects(payload: SearchProjectsPayload): Promise<SearchProjectsPayloadResult> {
    return await this.request({
      method: RequestMethod.Get,
      url: '/projects/search',
      params: payload,
    }).then((response: AxiosResponse<SearchProjectsPayloadResult>) => response.data);
  }

  public async getProject(payload: GetProjectByIdPayload): Promise<GetProjectByIdPayloadResult> {
    const id = payload.id ? payload.id.toString() : '';

    return await this.request({
      method: RequestMethod.Get,
      url: `/projects/${id}`,
      loading: true,
    }).then((response: AxiosResponse<GetProjectByIdPayloadResult>) => response.data);
  }

  public async createProject(payload: CreateProjectPayload): Promise<Guid> {
    return await this.request({
      method: RequestMethod.Post,
      url: '/projects',
      data: payload,
      loading: false,
    }).then((response: AxiosResponse<Guid>) => response.data);
  }

  public async updateProject(payload: UpdateProjectPayload): Promise<void> {
    return await this.request({
      method: RequestMethod.Put,
      url: '/projects',
      data: payload,
      loading: false,
    }).then((response: AxiosResponse<void>) => response.data);
  }

  public async deleteProject(payload: DeleteProjectPayload): Promise<void> {
    const id = payload.id ? payload.id.toString() : '';
    return await this.request({
      method: RequestMethod.Delete,
      url: `/projects/${id}`,
      loading: false,
    }).then((response: AxiosResponse<void>) => response.data);
  }
}

import { Configurations } from '~/core/configurations';
import { RequestMethod } from '~/core/enums';
import {
  GetProjectsPayload,
  SearchProjectsPayload,
  GetProjectByIdPayload,
  CreateProjectPayload,
  UpdateProjectPayload,
  DeleteProjectPayload,
} from '~/core/interfaces/payloads';
import { IProjectService } from '~/core/interfaces/services';
import { Project, ProjectList } from '~/core/models';
import { ApiService } from '~/services/api/api-service';
import { AxiosResponse } from 'axios';
import { injectable, inject } from 'inversify';

interface GetProjectByIdPayloadResult {
  readonly id: Guid;
  readonly createdDate: Date;
  readonly modifiedDate: Date;
  readonly title: string;
  readonly description: string;
}

interface GetProjectsPayloadResult {
  readonly totalPages: number;
  readonly count: number;
  readonly data: {
    readonly id: Guid;
    readonly createdDate: Date;
    readonly modifiedDate: Date;
    readonly title: string;
    readonly description: string;
  }[];
}

interface SearchProjectsPayloadResult {
  readonly totalPages: number;
  readonly count: number;
  readonly data: {
    readonly id: Guid;
    readonly createdDate: Date;
    readonly modifiedDate: Date;
    readonly title: string;
    readonly description: string;
  }[];
}

@injectable()
export class ProjectService extends ApiService implements IProjectService {
  constructor(@inject(Configurations) configurations: Configurations) {
    super(configurations.endpoints.projectManagerApi.baseUrl);
  }

  public async getProjects(payload: GetProjectsPayload): Promise<ProjectList> {
    return await this.request({
      method: RequestMethod.Get,
      url: '/projects',
      params: payload,
      loading: true,
    }).then(
      (response: AxiosResponse<GetProjectsPayloadResult>) =>
        new ProjectList(
          payload.pageIndex,
          payload.pageSize,
          response.data.totalPages,
          response.data.count,
          response.data.data.map(
            (item) => new Project(item.id, item.modifiedDate || item.createdDate, item.title, item.description)
          )
        )
    );
  }

  public async searchProjects(payload: SearchProjectsPayload): Promise<ProjectList> {
    return await this.request({
      method: RequestMethod.Get,
      url: '/projects/search',
      params: payload,
    }).then(
      (response: AxiosResponse<SearchProjectsPayloadResult>) =>
        new ProjectList(
          payload.pageIndex,
          payload.pageSize,
          response.data.totalPages,
          response.data.count,
          response.data.data.map(
            (item) => new Project(item.id, item.modifiedDate || item.createdDate, item.title, item.description)
          )
        )
    );
  }

  public async getProject(payload: GetProjectByIdPayload): Promise<Project> {
    const id = payload.id ? payload.id.toString() : '';

    return await this.request({
      method: RequestMethod.Get,
      url: `/projects/${id}`,
      loading: true,
    }).then(
      (response: AxiosResponse<GetProjectByIdPayloadResult>) =>
        new Project(
          response.data.id,
          response.data.modifiedDate || response.data.createdDate,
          response.data.title,
          response.data.description
        )
    );
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

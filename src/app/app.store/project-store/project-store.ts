import { useState } from './state';
import { useActions } from './actions';
import { useGetters } from './getters';
import { useMutations } from './mutations';
import { AppStore } from 'app.store';
import { inject, injectable } from 'inversify';
import { Project } from 'app.core/models';
import {
  GetProjectsPayload,
  SearchProjectsPayload,
  CreateProjectPayload,
  UpdateProjectPayload,
  DeleteProjectPayload,
  GetProjectByIdPayload,
} from 'app.core/interfaces/payloads';
import { IProjectStore } from 'app.core/interfaces/stores';
import { IProjectService } from 'app.core/interfaces/services';
import { InjectableType } from 'app.core/enums';
import { PaginatedStore } from 'app.store/_base/paginated-store';

@injectable()
export class ProjectStore extends PaginatedStore implements IProjectStore {
  constructor(
    @inject(AppStore) appStore: AppStore,
    @inject(InjectableType.IProjectService) projectService: IProjectService
  ) {
    super(appStore, 'project-manager/project-store');

    if (!this.store.hasModule(this.namespace)) {
      this.store.registerModule(this.namespace, {
        namespaced: true,
        actions: useActions(projectService),
        getters: useGetters(),
        mutations: useMutations(),
        state: useState(),
      });
    }
  }

  get currentProjects(): Project[] {
    return (this.store.getters as { [key: string]: Project[] })[`${this.namespace}/currentProjects`];
  }

  async fetchProjects(payload: GetProjectsPayload): Promise<void> {
    await this.store.dispatch(`${this.namespace}/fetchProjects`, payload);
  }

  async searchProjects(payload: SearchProjectsPayload): Promise<void> {
    await this.store.dispatch(`${this.namespace}/searchProjects`, payload);
  }

  async createProject(payload: CreateProjectPayload): Promise<void> {
    await this.store.dispatch(`${this.namespace}/createProject`, payload);
  }

  async updateProject(payload: UpdateProjectPayload): Promise<void> {
    await this.store.dispatch(`${this.namespace}/updateProject`, payload);
  }

  async deleteProject(payload: DeleteProjectPayload): Promise<void> {
    await this.store.dispatch(`${this.namespace}/deleteProject`, payload);
  }

  async getProjectById(payload: GetProjectByIdPayload): Promise<Project> {
    return (await this.store.dispatch(`${this.namespace}/getProjectById`, payload)) as Promise<Project>;
  }

  async reset(): Promise<void> {
    await this.store.dispatch(`${this.namespace}/reset`);
  }
}

import { Project } from 'app.core/models';
import {
  GetProjectsPayload,
  SearchProjectsPayload,
  GetProjectByIdPayload,
  CreateProjectPayload,
  UpdateProjectPayload,
  DeleteProjectPayload,
} from 'app.core/interfaces/payloads';
import { IProjectService } from 'app.core/interfaces/services';
import { ProjectStoreState, AppStoreState } from 'app.core/interfaces/stores';
import { ActionTree, ActionContext } from 'vuex';

export const useActions = (projectService: IProjectService): ActionTree<ProjectStoreState, AppStoreState> => ({
  async fetchProjects(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: GetProjectsPayload
  ): Promise<void> {
    context.commit('setFetching', true);
    const result = await projectService.getProjects(payload);
    context.commit('setProjects', Project.mapFromGetProjectsPayloadResult(result.data));
    context.commit('setPagination', {
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalCount: result.count,
      totalPages: result.totalPages,
    });
    context.commit('setFetching', false);
  },

  async searchProjects(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: SearchProjectsPayload
  ): Promise<void> {
    context.commit('setFetching', true);
    const result = await projectService.searchProjects(payload);
    context.commit('setProjects', Project.mapFromSearchProjectsPayloadResult(result.data));
    context.commit('setPagination', {
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalCount: result.count,
      totalPages: result.totalPages,
    });
    context.commit('setFetching', false);
  },

  async getProjectById(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: GetProjectByIdPayload
  ): Promise<Project> {
    const project: Project = context.state.projects.filter((project: Project) => project.id == payload.id)[0];

    if (project) {
      return project;
    }

    const data = await projectService.getProject(payload);
    return Project.mapFromGetProjectByIdPayloadResult(data);
  },

  async createProject(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: CreateProjectPayload
  ): Promise<void> {
    const id = await projectService.createProject(payload);

    context.commit('addProject', new Project(id, new Date(), payload.title, payload.description));
    context.commit('addPaginationItems', 1);
  },

  async updateProject(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: UpdateProjectPayload
  ): Promise<void> {
    await projectService.updateProject(payload);

    const project = context.state.projects.filter((project: Project) => project.id == payload.id)[0];
    if (project)
      context.commit('updateProject', new Project(project.id, new Date(), payload.title, payload.description));
  },

  async deleteProject(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: DeleteProjectPayload
  ): Promise<void> {
    await projectService.deleteProject(payload);
    context.commit('deleteProject', payload.id);
    context.commit('removePaginationItems', 1);
  },

  reset(context: ActionContext<ProjectStoreState, AppStoreState>): void {
    context.commit('setProjects', []);
  },
});

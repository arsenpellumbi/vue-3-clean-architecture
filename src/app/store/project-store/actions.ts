import { ProjectList, Project } from 'app.core/models';
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
    const result = await projectService.getProjects(payload);
    context.commit('setProjects', result);
  },

  async searchProjects(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: SearchProjectsPayload
  ): Promise<void> {
    const result = await projectService.searchProjects(payload);
    context.commit('setProjects', result);
  },

  async getProjectById(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: GetProjectByIdPayload
  ): Promise<Project> {
    const project = context.state.projectList.rows.find((project: Project) => project.id == payload.id);
    if (project) {
      return project;
    }

    return await projectService.getProject(payload);
  },

  async createProject(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: CreateProjectPayload
  ): Promise<void> {
    const id = await projectService.createProject(payload);

    context.commit('addProject', new Project(id, new Date(), payload.title, payload.description));
  },

  async updateProject(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: UpdateProjectPayload
  ): Promise<void> {
    await projectService.updateProject(payload);

    const project = context.state.projectList.rows.find((project: Project) => project.id == payload.id);
    if (project)
      context.commit('updateProject', new Project(project.id, new Date(), payload.title, payload.description));
  },

  async deleteProject(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: DeleteProjectPayload
  ): Promise<void> {
    await projectService.deleteProject(payload);
    context.commit('deleteProject', payload.id);
    if (context.state.projectList.rows.length === 0) {
      context.dispatch('fetchProjects', {
        pageIndex: context.state.projectList.pagination.pageIndex,
        pageSize: context.state.projectList.pagination.pageSize,
      });
    }
  },

  reset(context: ActionContext<ProjectStoreState, AppStoreState>): void {
    context.commit('setProjects', new ProjectList());
  },
});

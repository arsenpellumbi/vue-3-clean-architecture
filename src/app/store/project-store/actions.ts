import { ActionTree, ActionContext } from 'vuex';
import { ProjectList, Project } from '~/core/models';
import { ProjectPayloads } from '~/core/payloads';
import { ProjectService } from '~/services/project-service';
import { AppStoreState } from '../app-store';
import { ProjectStoreState } from './state';

export const useActions = (projectService: ProjectService): ActionTree<ProjectStoreState, AppStoreState> => ({
  async fetchProjects(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: ProjectPayloads.GetProjectsPayload
  ): Promise<void> {
    const result = await projectService.getProjects(payload);
    context.commit('setProjects', result);
  },

  async searchProjects(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: ProjectPayloads.SearchProjectsPayload
  ): Promise<void> {
    const result = await projectService.searchProjects(payload);
    context.commit('setProjects', result);
  },

  async getProjectById(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: ProjectPayloads.GetProjectByIdPayload
  ): Promise<Project> {
    const project = context.state.projectList.rows.find((project: Project) => project.id == payload.id);
    if (project) {
      return project;
    }

    return await projectService.getProject(payload);
  },

  async createProject(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: ProjectPayloads.CreateProjectPayload
  ): Promise<void> {
    const id = await projectService.createProject(payload);

    context.commit('addProject', new Project(id, new Date(), payload.title, payload.description));
  },

  async updateProject(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: ProjectPayloads.UpdateProjectPayload
  ): Promise<void> {
    await projectService.updateProject(payload);

    const project = context.state.projectList.rows.find((project: Project) => project.id == payload.id);
    if (project)
      context.commit('updateProject', new Project(project.id, new Date(), payload.title, payload.description));
  },

  async deleteProject(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: ProjectPayloads.DeleteProjectPayload
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

import { MutationTree } from 'vuex';
import { Project } from 'app.core/models';
import { ProjectStoreState } from 'app.core/interfaces/stores';
import { useMutations as usePaginatedMutations } from 'app.store/_base/paginated-store/mutations';

export const useMutations = (): MutationTree<ProjectStoreState> => ({
  ...usePaginatedMutations(),
  setProjects(state: ProjectStoreState, projects: Project[]): void {
    state.projects = projects;
  },

  addProject(state: ProjectStoreState, project: Project): void {
    state.projects.unshift(project);
  },

  updateProject(state: ProjectStoreState, project: Project): void {
    const index = state.projects.indexOf(state.projects.filter((_project: Project) => _project.id === project.id)[0]);
    state.projects = Object.assign([], state.projects, { [index]: project });
  },

  deleteProject(state: ProjectStoreState, id: Guid): void {
    state.projects = state.projects.filter((_project: Project) => _project.id !== id);
  },
});

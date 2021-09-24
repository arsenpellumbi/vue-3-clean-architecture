import { GetterTree } from 'vuex';
import { AppStoreState, ProjectStoreState } from 'app.core/interfaces/stores';
import { Project } from 'app.core/models';
import { useGetters as usePaginatedGetters } from 'app.store/_base/paginated-store/getters';

export const useGetters = (): GetterTree<ProjectStoreState, AppStoreState> => ({
  ...usePaginatedGetters(),
  currentProjects(state: ProjectStoreState): Project[] {
    return state.projects;
  },
});

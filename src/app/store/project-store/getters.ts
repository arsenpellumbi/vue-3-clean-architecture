import { GetterTree } from 'vuex';
import { AppStoreState, ProjectStoreState } from 'app.core/interfaces/stores';
import { ProjectList } from 'app.core/models';

export const useGetters = (): GetterTree<ProjectStoreState, AppStoreState> => ({
  projectList(state: ProjectStoreState): ProjectList {
    return state.projectList;
  },
});

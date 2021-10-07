import { GetterTree } from 'vuex';
import { AppStoreState, ProjectStoreState } from '~/core/interfaces/stores';
import { ProjectList } from '~/core/models';

export const useGetters = (): GetterTree<ProjectStoreState, AppStoreState> => ({
  projectList(state: ProjectStoreState): ProjectList {
    return state.projectList;
  },
});

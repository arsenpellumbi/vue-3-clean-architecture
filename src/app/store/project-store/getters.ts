import { GetterTree } from 'vuex';
import { ProjectList } from '~/core/models';
import { AppStoreState } from '../app-store';
import { ProjectStoreState } from './state';

export const useGetters = (): GetterTree<ProjectStoreState, AppStoreState> => ({
  projectList(state: ProjectStoreState): ProjectList {
    return state.projectList;
  },
});

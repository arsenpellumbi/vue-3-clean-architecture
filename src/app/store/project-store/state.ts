import { ProjectList } from '~/core/models';

export interface ProjectStoreState {
  readonly projectList: ProjectList;
}

export const useState = (): ProjectStoreState => ({
  projectList: new ProjectList(),
});

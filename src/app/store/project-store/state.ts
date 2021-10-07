import { ProjectStoreState } from '~/core/interfaces/stores';
import { ProjectList } from '~/core/models';

export const useState = (): ProjectStoreState => ({
  projectList: new ProjectList(),
});

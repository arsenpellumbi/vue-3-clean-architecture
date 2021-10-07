import { ProjectStoreState } from 'app.core/interfaces/stores';
import { ProjectList } from 'app.core/models';

export const useState = (): ProjectStoreState => ({
  projectList: new ProjectList(),
});

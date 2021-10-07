import { Project, ProjectList } from '~/core/models';
import { IBaseStore } from './base-store.interface';
import {
  GetProjectsPayload,
  SearchProjectsPayload,
  CreateProjectPayload,
  UpdateProjectPayload,
  DeleteProjectPayload,
  GetProjectByIdPayload,
} from '../payloads';

export interface ProjectStoreState {
  readonly projectList: ProjectList;
}

export interface IProjectStore extends IBaseStore {
  projectList: ProjectList;

  fetchProjects(payload: GetProjectsPayload): Promise<void>;

  searchProjects(payload: SearchProjectsPayload): Promise<void>;

  createProject(payload: CreateProjectPayload): Promise<void>;

  updateProject(payload: UpdateProjectPayload): Promise<void>;

  deleteProject(payload: DeleteProjectPayload): Promise<void>;

  getProjectById(payload: GetProjectByIdPayload): Promise<Project>;

  reset(): Promise<void>;
}

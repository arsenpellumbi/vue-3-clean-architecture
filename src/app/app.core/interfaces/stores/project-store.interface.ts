import { Project } from 'app.core/models';
import { PaginatedStoreState, IPaginatedStore } from '.';
import {
  GetProjectsPayload,
  SearchProjectsPayload,
  CreateProjectPayload,
  UpdateProjectPayload,
  DeleteProjectPayload,
  GetProjectByIdPayload
} from '../payloads';

export interface ProjectStoreState extends PaginatedStoreState {
  projects: Project[];
}

export interface IProjectStore extends IPaginatedStore {
  currentProjects: Project[];

  fetchProjects(payload: GetProjectsPayload): Promise<void>;

  searchProjects(payload: SearchProjectsPayload): Promise<void>;

  createProject(payload: CreateProjectPayload): Promise<void>;

  updateProject(payload: UpdateProjectPayload): Promise<void>;

  deleteProject(payload: DeleteProjectPayload): Promise<void>;

  getProjectById(payload: GetProjectByIdPayload): Promise<Project>;

  reset(): Promise<void>;
}

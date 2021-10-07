import { Project, ProjectList } from 'app.core/models';
import {
  GetProjectsPayload,
  SearchProjectsPayload,
  GetProjectByIdPayload,
  CreateProjectPayload,
  UpdateProjectPayload,
  DeleteProjectPayload,
} from '../payloads';

export interface IProjectService {
  getProjects(payload: GetProjectsPayload): Promise<ProjectList>;
  searchProjects(payload: SearchProjectsPayload): Promise<ProjectList>;
  getProject(payload: GetProjectByIdPayload): Promise<Project>;
  createProject(payload: CreateProjectPayload): Promise<Guid>;
  updateProject(payload: UpdateProjectPayload): Promise<void>;
  deleteProject(payload: DeleteProjectPayload): Promise<void>;
}

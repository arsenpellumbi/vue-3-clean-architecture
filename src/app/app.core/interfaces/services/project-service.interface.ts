import {
  GetProjectsPayload,
  SearchProjectsPayload,
  GetProjectByIdPayload,
  CreateProjectPayload,
  UpdateProjectPayload,
  DeleteProjectPayload
} from '../payloads';
import { GetProjectsPayloadResult, SearchProjectsPayloadResult, GetProjectByIdPayloadResult } from '../payloads-result';

export interface IProjectService {
  getProjects(payload: GetProjectsPayload): Promise<GetProjectsPayloadResult>;
  searchProjects(payload: SearchProjectsPayload): Promise<SearchProjectsPayloadResult>;
  getProject(payload: GetProjectByIdPayload): Promise<GetProjectByIdPayloadResult>;
  createProject(payload: CreateProjectPayload): Promise<Guid>;
  updateProject(payload: UpdateProjectPayload): Promise<void>;
  deleteProject(payload: DeleteProjectPayload): Promise<void>;
}

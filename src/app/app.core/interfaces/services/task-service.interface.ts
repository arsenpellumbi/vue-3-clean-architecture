import {
  GetTasksByProjectIdPayload,
  SearchTasksInProjectPayload,
  GetTaskByIdPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
  DeleteTaskPayload
} from '../payloads';
import {
  GetTasksByProjectIdPayloadResult,
  SearchTasksInProjectPayloadResult,
  GetTaskByIdPayloadResult
} from '../payloads-result';

export interface ITaskService {
  getTasks(payload: GetTasksByProjectIdPayload): Promise<GetTasksByProjectIdPayloadResult>;
  searchTasks(payload: SearchTasksInProjectPayload): Promise<SearchTasksInProjectPayloadResult>;
  getTask(payload: GetTaskByIdPayload): Promise<GetTaskByIdPayloadResult>;
  createTask(payload: CreateTaskPayload): Promise<Guid>;
  updateTask(payload: UpdateTaskPayload): Promise<void>;
  deleteTask(payload: DeleteTaskPayload): Promise<void>;
}

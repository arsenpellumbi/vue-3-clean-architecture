import { Task, TaskList } from '~/core/models';
import {
  GetTasksByProjectIdPayload,
  SearchTasksInProjectPayload,
  GetTaskByIdPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
  DeleteTaskPayload
} from '../payloads';

export interface ITaskService {
  getTasks(payload: GetTasksByProjectIdPayload): Promise<TaskList>;
  searchTasks(payload: SearchTasksInProjectPayload): Promise<TaskList>;
  getTask(payload: GetTaskByIdPayload): Promise<Task>;
  createTask(payload: CreateTaskPayload): Promise<Guid>;
  updateTask(payload: UpdateTaskPayload): Promise<void>;
  deleteTask(payload: DeleteTaskPayload): Promise<void>;
}

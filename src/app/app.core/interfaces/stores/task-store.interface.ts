import { Task } from 'app.core/models';
import { PaginatedStoreState, IPaginatedStore } from '.';
import {
  GetTasksByProjectIdPayload,
  SearchTasksInProjectPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
  DeleteTaskPayload,
  GetTaskByIdPayload
} from '../payloads';

export interface TaskStoreState extends PaginatedStoreState {
  tasks: Task[];
}

export interface ITaskStore extends IPaginatedStore {
  currentTasks: Task[];

  fetchTasks(payload: GetTasksByProjectIdPayload): Promise<void>;

  searchTasks(payload: SearchTasksInProjectPayload): Promise<void>;

  createTask(payload: CreateTaskPayload): Promise<void>;

  updateTask(payload: UpdateTaskPayload): Promise<void>;

  deleteTask(payload: DeleteTaskPayload): Promise<void>;

  getTaskById(payload: GetTaskByIdPayload): Promise<Task>;

  reset(): Promise<void>;
}

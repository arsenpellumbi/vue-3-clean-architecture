import { Task, TaskList } from '~/core/models';
import { IBaseStore } from './base-store.interface';
import {
  GetTasksByProjectIdPayload,
  SearchTasksInProjectPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
  DeleteTaskPayload,
  GetTaskByIdPayload,
} from '../payloads';

export interface TaskStoreState {
  readonly taskList: TaskList;
}

export interface ITaskStore extends IBaseStore {
  taskList: TaskList;

  fetchTasks(payload: GetTasksByProjectIdPayload): Promise<void>;

  searchTasks(payload: SearchTasksInProjectPayload): Promise<void>;

  createTask(payload: CreateTaskPayload): Promise<void>;

  updateTask(payload: UpdateTaskPayload): Promise<void>;

  deleteTask(payload: DeleteTaskPayload): Promise<void>;

  getTaskById(payload: GetTaskByIdPayload): Promise<Task>;

  reset(): Promise<void>;
}

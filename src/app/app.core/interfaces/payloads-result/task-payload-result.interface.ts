import { TaskType } from 'app.core/enums';

export interface GetTaskByIdPayloadResult {
  readonly id: Guid;
  readonly createdDate: Date;
  readonly modifiedDate: Date;
  readonly title: string;
  readonly description: string;
  readonly projectId: Guid;
  readonly type: TaskType;
}

export interface GetTasksByProjectIdPayloadResultItem {
  readonly id: Guid;
  readonly createdDate: Date;
  readonly modifiedDate: Date;
  readonly title: string;
  readonly description: string;
  readonly projectId: Guid;
  readonly type: TaskType;
}

export interface GetTasksByProjectIdPayloadResult {
  totalPages: number;
  count: number;
  data: GetTasksByProjectIdPayloadResultItem[];
}

export interface SearchTasksInProjectPayloadResultItem {
  readonly id: Guid;
  readonly createdDate: Date;
  readonly modifiedDate: Date;
  readonly title: string;
  readonly description: string;
  readonly projectId: Guid;
  readonly type: TaskType;
}

export interface SearchTasksInProjectPayloadResult {
  totalPages: number;
  count: number;
  data: SearchTasksInProjectPayloadResultItem[];
}

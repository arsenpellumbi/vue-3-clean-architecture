import { TaskType } from 'app.core/enums';
import {
  GetTaskByIdPayloadResult,
  GetTasksByProjectIdPayloadResultItem,
  SearchTasksInProjectPayloadResultItem,
} from 'app.core/interfaces/payloads-result';

export class Task {
  readonly id?: Guid;
  readonly date: Date | null;
  readonly title: string;
  readonly description: string;
  readonly projectId: Guid;
  readonly type: TaskType;

  constructor();
  constructor(id: Guid, date: Date | null, title: string, description: string, projectId: Guid, type: TaskType);
  constructor(id?: Guid, date?: Date | null, title?: string, description?: string, projectId?: Guid, type?: TaskType) {
    this.id = id || null;
    this.date = date || null;
    this.title = title || '';
    this.description = description || '';
    this.projectId = projectId || null;
    this.type = type || TaskType.ToDo;
  }

  public static mapFromGetTaskByIdPayloadResult(data: GetTaskByIdPayloadResult) {
    return new Task(
      data.id,
      data.modifiedDate || data.createdDate,
      data.title,
      data.description,
      data.projectId,
      data.type
    );
  }

  public static mapFromGetTasksByProjectIdPayloadResult(data: GetTasksByProjectIdPayloadResultItem[]) {
    return data.map(
      (item) =>
        new Task(
          item.id,
          item.modifiedDate || item.createdDate,
          item.title,
          item.description,
          item.projectId,
          item.type
        )
    );
  }
  public static mapFromSearchTasksInProjectPayloadResult(data: SearchTasksInProjectPayloadResultItem[]) {
    return data.map(
      (item) =>
        new Task(
          item.id,
          item.modifiedDate || item.createdDate,
          item.title,
          item.description,
          item.projectId,
          item.type
        )
    );
  }

  public clone(): Task {
    return new Task(this.id, this.date, this.title, this.description, this.projectId, this.type);
  }
}

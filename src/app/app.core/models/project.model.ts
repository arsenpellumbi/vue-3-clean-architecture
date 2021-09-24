import {
  GetProjectsPayloadResultItem,
  SearchProjectsPayloadResultItem,
  GetProjectByIdPayloadResult,
} from 'app.core/interfaces/payloads-result';

export class Project {
  readonly id?: Guid;
  readonly date: Date | null;
  readonly title: string;
  readonly description: string;

  constructor();
  constructor(id: Guid, date: Date | null, title: string, description: string);
  constructor(id?: Guid, date?: Date | null, title?: string, description?: string) {
    this.id = id || null;
    this.date = date || null;
    this.title = title || '';
    this.description = description || '';
  }

  public static mapFromGetProjectsPayloadResult(data: GetProjectsPayloadResultItem[]): Project[] {
    return data.map(
      (item) => new Project(item.id, item.modifiedDate || item.createdDate, item.title, item.description)
    );
  }

  public static mapFromSearchProjectsPayloadResult(data: SearchProjectsPayloadResultItem[]): Project[] {
    return data.map(
      (item) => new Project(item.id, item.modifiedDate || item.createdDate, item.title, item.description)
    );
  }

  public static mapFromGetProjectByIdPayloadResult(data: GetProjectByIdPayloadResult): Project {
    return new Project(data.id, data.modifiedDate || data.createdDate, data.title, data.description);
  }

  public clone(): Project {
    return new Project(this.id, this.date, this.title, this.description);
  }
}

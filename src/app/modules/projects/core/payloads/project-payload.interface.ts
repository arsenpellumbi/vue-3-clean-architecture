export interface CreateProjectPayload {
  readonly title: string;
  readonly description: string;
}

export interface UpdateProjectPayload {
  readonly id: Guid;
  readonly title: string;
  readonly description: string;
}

export interface DeleteProjectPayload {
  readonly id: Guid;
}

export interface GetProjectsPayload {
  pageIndex: number;
  pageSize: number;
}

export interface SearchProjectsPayload {
  pageIndex: number;
  pageSize: number;
  value: string;
}

export interface GetProjectByIdPayload {
  id: Guid;
}

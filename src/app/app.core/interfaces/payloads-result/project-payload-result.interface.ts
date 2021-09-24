export interface GetProjectsPayloadResultItem {
  readonly id: Guid;
  readonly createdDate: Date;
  readonly modifiedDate: Date;
  readonly title: string;
  readonly description: string;
}

export interface GetProjectsPayloadResult {  
  totalPages: number;
  count: number;
  data: GetProjectsPayloadResultItem[];
}

export interface SearchProjectsPayloadResultItem {
  readonly id: Guid;
  readonly createdDate: Date;
  readonly modifiedDate: Date;
  readonly title: string;
  readonly description: string;
}

export interface SearchProjectsPayloadResult {  
  totalPages: number;
  count: number;
  data: SearchProjectsPayloadResultItem[];
}

export interface GetProjectByIdPayloadResult {
  readonly id: Guid;
  readonly createdDate: Date;
  readonly modifiedDate: Date;
  readonly title: string;
  readonly description: string;
}

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import { RequestOptions } from '~/core/types';

@injectable()
export class ApiService {
  private _options: AxiosRequestConfig;

  constructor(endpoint: string) {
    this._options = {
      ...axios,
      baseURL: endpoint,
    };
  }

  public request = (options: RequestOptions): Promise<AxiosResponse> => axios({ ...this._options, ...options });
}

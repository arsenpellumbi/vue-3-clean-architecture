import { ApiInterceptor } from '~/services/api/api-interceptors';
import { PluginParams } from 'app.core/types';
import { container } from '~/inversify.config';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

export default function <TStore>({ app }: PluginParams<TStore>) {
  const apiInterceptor = container.get<ApiInterceptor>(ApiInterceptor);

  axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  };

  axios.interceptors.request.use(
    async (config: AxiosRequestConfig) => await apiInterceptor.handleRequest(config),
    async (error: AxiosError) => await apiInterceptor.handleRequestError(error)
  );

  axios.interceptors.response.use(
    async (response: AxiosResponse) => await apiInterceptor.handleResponse(response),
    async (error: AxiosError) => await apiInterceptor.handleResponseError(error)
  );

  app.config.globalProperties.$axios = axios;
}

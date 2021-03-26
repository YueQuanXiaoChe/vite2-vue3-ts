import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
// import { cloneDeep } from 'lodash-es';
// import qs from 'qs';

export class Axios {
  private axiosInstance: AxiosInstance;
  private options: AxiosRequestConfig;

  constructor(options: AxiosRequestConfig) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 添加请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 每次请求前，如果存在 token 则在请求头中携带 token
        const userToken = window.sessionStorage.getItem('userToken');
        if (userToken) {
          config.headers = {
            'Tcsl-Loongboss-Token': userToken
          };
        }
        return config;
      },
      (error: Error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );
    // 添加响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        // 对响应数据做点什么
        console.log('response ---->', response);
        return response;
      },
      (error: Error) => {
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }

  getOptions() {
    return this.options;
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  reconfigAxios(options: AxiosRequestConfig) {
    if (!this.axiosInstance) {
      return;
    }
    this.options = options;
    this.axiosInstance = axios.create(options);
  }

  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    const p: Promise<T> = this.axiosInstance.request(config);
    p.then((res: T) => {
      console.log('res ---->', res);
    });
    p.catch((err: Error) => {
      console.log('err ---->', err);
    });
    return p;
  }

  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }
}

import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, Canceler } from 'axios';
import axios from 'axios';
import { AxiosCancel } from './AxiosCancel';
import { CreateAxiosOptions } from './AxiosTransform';
// import { cloneDeep } from 'lodash-es';
// import qs from 'qs';

export class Axios {
  private axiosInstance: AxiosInstance;
  private options: CreateAxiosOptions;
  // 存储每个请求的标识和取消的函数
  endingMap: Map<string, Canceler> = new Map<string, Canceler>();

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    const axiosCancel = new AxiosCancel();
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

        // 如果每次请求的 headers 中有 ignoreCancelToken 标识则使用这个标识
        // 否则使用 options.requestOptions 中的 ignoreCancelToken 标识
        const ignoreCancelToken = config.headers.ignoreCancelToken;
        console.log('ignoreCancelToken ---->', ignoreCancelToken);
        const ignoreCancel =
          ignoreCancelToken !== undefined
            ? ignoreCancelToken
            : this.options.requestOptions?.ignoreCancelToken;
        console.log('ignoreCancel ---->', ignoreCancel);

        !ignoreCancel && axiosCancel.addPending(config);
        return config;
      },
      (error: Error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );
    // 添加响应拦截器
    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse<any>) => {
        axiosCancel.removePending(res.config);
        // 对响应数据做点什么
        console.log('response ---->', res);
        return res;
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

  reconfigAxios(options: CreateAxiosOptions) {
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

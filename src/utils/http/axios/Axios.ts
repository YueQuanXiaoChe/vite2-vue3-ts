import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { AxiosCancel } from './AxiosCancel';
import { AxiosTransform, CreateAxiosOptions } from './AxiosTransform';
import { isFunction } from '@/utils/is';
import { RequestOptions, Result } from './types';
import { cloneDeep } from 'lodash-es';
import { ERROR_RESULT } from './const';
// import qs from 'qs';

export class Axios {
  private axiosInstance: AxiosInstance;
  private options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  private getTransform(): AxiosTransform | undefined {
    const { transform } = this.options;
    return transform;
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  reconfigAxios(options: CreateAxiosOptions): void {
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

  getOptions(): CreateAxiosOptions {
    return this.options;
  }

  private setupInterceptors(): void {
    // 请求、响应操作的各种拦截器
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform;

    // 取消请求处理器
    const axiosCancel = new AxiosCancel();

    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
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
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config);
      }
      return config;
    }, undefined);

    // 请求拦截器错误捕获
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // 响应结果拦截器处理
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCancel.removePending(res.config);
      // 对响应数据做点什么
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      console.log('response ---->', res);
      return res;
    }, undefined);

    // 响应结果拦截器错误捕获
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    const conf: AxiosRequestConfig = cloneDeep(config);

    const { requestOptions } = this.options;

    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { requestCatchHook, transformRequestHook } = this.getTransform() || {};

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            const ret = transformRequestHook(res, opt);
            ret !== ERROR_RESULT ? resolve(ret) : reject(new Error('request error!'));
            return;
          }
          resolve((res as unknown) as Promise<T>);
        })
        .catch((e: Error) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e));
            return;
          }
          reject(e);
        });
    });
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }
}

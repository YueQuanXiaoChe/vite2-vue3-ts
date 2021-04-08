/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from './types';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  // 数据处理方式
  transform?: AxiosTransform;
  // 配置项，其中的选项都可以在独立的接口请求中覆盖
  requestOptions?: RequestOptions;
}

export abstract class AxiosTransform {
  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: 请求之前处理 config
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  /**
   * @description: 请求成功处理
   */
  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error) => Promise<any>;
}

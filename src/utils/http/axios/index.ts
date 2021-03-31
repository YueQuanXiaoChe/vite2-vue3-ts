import { Axios } from './Axios';
import { ContentTypeEnum } from '@/enums/httpEnum';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 每次请求前，如果存在 token 则在请求头中携带 token
    const userToken = window.sessionStorage.getItem('userToken');
    if (userToken) {
      config.headers = {
        'Tcsl-Loongboss-Token': userToken
      };
    }
    return config;
  },

  /**
   * @description: 请求错误处理
   */
  requestInterceptorsCatch: (error: Error) => {
    return Promise.reject(error);
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: Error) => {
    return Promise.reject(error);
  }
};

const options: CreateAxiosOptions = {
  baseURL: '/proxy',
  timeout: 10 * 1000, // 指定请求超时的毫秒数(0 表示无超时时间)
  // 自定义请求头
  headers: {
    'Content-Type': ContentTypeEnum.JSON
  },
  // 数据处理方式
  transform,
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 忽略重复请求
    ignoreCancelToken: true
  }
};

function createAxios(opt: CreateAxiosOptions = options): Axios {
  return new Axios(opt);
}

export const defHttp = createAxios();

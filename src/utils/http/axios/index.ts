import { Axios } from './Axios';
import { ContentTypeEnum } from '@/enums/httpEnum';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { AxiosResponse } from 'axios';
import { RequestOptions, Result } from './types';
import { ERROR_RESULT } from './const';
import { Dialog, Toast, Notify } from 'vant';

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
  },

  /**
   * @description: 处理请求数据
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformRequestResult } = options;
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取 code，data，msg，success 这些信息时开启
    if (!isTransformRequestResult) {
      return res.data;
    }
    if (!res.data) {
      // return '[HTTP] Request has no return value';
      return ERROR_RESULT;
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data, msg } = res.data;

    // 这里逻辑可以根据项目进行修改
    if (code !== '0') {
      if (msg) {
        const errMsg = { message: msg };
        if (options.errorMessageMode === 'Dialog') {
          Dialog.alert(errMsg);
        } else if (options.errorMessageMode === 'Toast') {
          Toast.fail(errMsg);
        } else if (options.errorMessageMode === 'Notify') {
          Notify({ type: 'danger', message: msg });
        }
      }
    }
    return data;
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
    ignoreCancelToken: true,
    // 需要对返回数据进行处理
    isTransformRequestResult: true,
    // 消息提示类型
    errorMessageMode: 'Toast'
  }
};

function createAxios(opt: CreateAxiosOptions = options): Axios {
  return new Axios(opt);
}

export const defHttp = createAxios();
